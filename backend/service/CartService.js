import CartItem from "../model/CardItem.js";
import CartModel from "../model/Cart.js";
import Category from "../model/Category.js";
import Deal from "../model/Deal.js";
import ProductService, { calaculateDiscountPercentage } from "./ProductService.js";

class CartService {
  async findUserCart(user) {
    console.log("Logged in user id:", user._id);
    
    let cart = await CartModel.findOne({ user: user._id });
    
    if (!cart) {
      cart = await CartModel.create({ user: user._id, cartItems: [] });
    }

let cartItems = await CartItem.find({ cart: cart._id }).populate({
  path: "product",
  populate: {
    path: "category"
  }
});
    
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItemCount = 0;

for (const item of cartItems) {

  const unitMrp = item.product.mrpPrice;
  let unitSelling = item.product.sellingPrice;

  let category = item.product.category;
  let deal = null;

  while (category && !deal) {

    console.log("Checking Category:", category.name);

  
    deal = await Deal.findOne({
      category: category._id,
    });

    if (deal) {
      console.log("Deal Found:", deal.discount);
      break;
    }


    if (category.parentCategory) {
      category = await Category.findById(category.parentCategory);
    } else {
      category = null
    }
  }

  if (deal) {
    unitSelling =
      unitSelling - (unitSelling * deal.discount) / 100;
  }

 item.sellingPrice = unitSelling * item.quantity;
item.mrpPrice = item.product.mrpPrice * item.quantity;

await item.save();

const qty = item.quantity;

totalPrice += unitMrp * qty;
totalDiscountedPrice += unitSelling * qty;
totalItemCount += qty;
}

    const shippingCharge = totalDiscountedPrice > 0 ? 79 : 0; 

    cart.totalMrpPrice = totalPrice;
    cart.totalSellingPrice = totalDiscountedPrice + shippingCharge; 
    cart.shippingCharge = shippingCharge;
    cart.totalItem = totalItemCount;
    cart.discount = calaculateDiscountPercentage(totalPrice, totalDiscountedPrice);

    cart.cartItems = cartItems.map(item => item._id);

    await cart.save();

    cart.cartItems = cartItems;
    return cart;
  }

  async addCartItem(user, product, size, quantity) {
    let cart = await CartModel.findOne({ user: user._id });
    
    if (!cart) {
      cart = await CartModel.create({ user: user._id, cartItems: [] });
    }

    let isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      size: size
    }).populate("product");

    const itemQty = Number(quantity) || 1;
    const baseSellingPrice = Number(product.sellingPrice) || 0;
    const baseMrpPrice = Number(product.mrpPrice) || 0;

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        quantity: itemQty,
        userId: user._id,
        sellingPrice: itemQty * baseSellingPrice,
        mrpPrice: itemQty * baseMrpPrice,
        size,
        cart: cart._id
      });

      const savedCartItem = await cartItem.save();

      cart.cartItems.push(savedCartItem._id);
      await cart.save();

      return await this.findUserCart(user);
    } else {
      isPresent.quantity += itemQty;
      isPresent.sellingPrice = isPresent.quantity * baseSellingPrice;
      isPresent.mrpPrice = isPresent.quantity * baseMrpPrice;
      await isPresent.save();

      return await this.findUserCart(user);
    }
  }
}

export default new CartService();