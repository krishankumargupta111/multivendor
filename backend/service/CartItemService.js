import CartItem from "../model/CardItem.js";
import CartModel from "../model/Cart.js";
import Deal from "../model/Deal.js";
import Category from "../model/Category.js";

class CartItemService {

  async removeCartItem(userId, cartItemId) {
    const cartItem = await this.findCartItemById(cartItemId);

    if (cartItem.userId.toString() === userId.toString()) {
      await CartItem.deleteOne({ _id: cartItem._id });

      await CartModel.findByIdAndUpdate(cartItem.cart, {
        $pull: { cartItems: cartItem._id },
      });

      return { message: "Item removed successfully" };
    }

    throw new Error("Unauthorized access");
  }

  async updateCartItem(userId, cartItemId, cartItemData) {
    const cartItem = await this.findCartItemById(cartItemId);

    if (cartItem.userId.toString() !== userId.toString()) {
      throw new Error("Unauthorized access");
    }

    const newQuantity = Number(cartItemData.quantity);

    let finalSellingPrice = cartItem.product.sellingPrice;

    // Find deal for current category or parent category
    let category = cartItem.product.category;
    let deal = null;

    while (category && !deal) {

      deal = await Deal.findOne({
        category: category._id,
      });

      if (deal) break;

      if (category.parentCategory) {
        category = await Category.findById(category.parentCategory);
      } else {
        category = null;
      }
    }

    if (deal) {
      finalSellingPrice =
        finalSellingPrice - (finalSellingPrice * deal.discount) / 100;
    }

    const updatedCartItem = await CartItem.findByIdAndUpdate(
      cartItemId,
      {
        quantity: newQuantity,
        mrpPrice: cartItem.product.mrpPrice * newQuantity,
        sellingPrice: finalSellingPrice * newQuantity,
      },
      { new: true }
    ).populate({
      path: "product",
      populate: {
        path: "category",
      },
    });

    return updatedCartItem;
  }

  async findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate({
      path: "product",
      populate: {
        path: "category",
      },
    });

    if (!cartItem) {
      throw new Error("Cart item not found");
    }

    return cartItem;
  }
}

export default new CartItemService();