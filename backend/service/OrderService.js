import mongoose from "mongoose"
import Order from "../model/Order.js"
import OrderItem from "../model/OrderItem.js"
import UserModel from "../model/User.js"
import orderStatus from "../domain/OrderStatus.js"


import addressModel from "../model/Address.js"

class OrderService{
async createOrder(user, addressId, cart) {

        const shippingAddress = await addressModel.findById(addressId);

        if (!shippingAddress) {
            throw new Error("Address not found");
        }

        const itemsByseller = cart.cartItems.reduce((acc, item) => {
            const sellerId = item.product.seller._id.toString();

            acc[sellerId] = acc[sellerId] || [];
            acc[sellerId].push(item);

            return acc;
        }, {});

        const orders = new Set();
        const sellerCount = Object.keys(itemsByseller).length;

        for (const [sellerId, cartItems] of Object.entries(itemsByseller)) {

            const itemsSellingPrice = cartItems.reduce(
                (sum, item) => sum + ((item.product?.sellingPrice ?? item.sellingPrice ?? 0) * (item.quantity || 1)),
                0
            );

            const totalMrpPrice = cartItems.reduce(
                (sum, item) => sum + ((item.product?.mrpPrice ?? item.mrpPrice ?? 0) * (item.quantity || 1)),
                0
            );

            const totalItemCount = cartItems.reduce(
                (sum, item) => sum + (item.quantity || 1),
                0
            );
     
            const sellerShippingCharge = cart.shippingCharge 
                ? Math.floor((cart.shippingCharge / sellerCount) * 100) / 100 
                : 0;

            const totalOrderPrice = itemsSellingPrice + sellerShippingCharge;
          
            const newOrder = new Order({
                user: user._id,
                shippingAddress: shippingAddress._id,
                seller: sellerId,
                orderItems: [],
                totalMrpPrice: totalMrpPrice,
                shippingCharge: sellerShippingCharge,
                totalSellingPrice: totalOrderPrice,   
                totalItem: totalItemCount,
            });

            await Promise.all(
                cartItems.map(async (cartItem) => {
                    const orderItem = new OrderItem({
                        product: cartItem.product._id,
                        quantity: cartItem.quantity,
                        sellingPrice: cartItem.sellingPrice,
                        mrpPrice: cartItem.mrpPrice,
                        size: cartItem.size,
                        userId: cartItem.userId,
                    });

                    const savedOrderItem = await orderItem.save();
                    newOrder.orderItems.push(savedOrderItem._id);
                })
            );

            const savedOrder = await newOrder.save();
            orders.add(savedOrder);
        }

        return Array.from(orders);
    }


    async findOrderById(orderId){
        
        if(
            !mongoose.Types.ObjectId.isValid(orderId)
        ){
            throw new Error("invalid order id")
        }
        const order=await Order.findById(orderId).populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ])
     
        if(!order){
            throw new Error("order not found")
        }
        return order
    }

    async usersOrderHistory(userId){
        return await Order.find({user:userId}).populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ])
    }

     async getSellerOrder(sellerId){
        return await Order.find({seller:sellerId})
         .sort({orderDate:-1})
         .populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ])
    }
    async updateOrderStatus(orderId,status){
        
        const order=await this.findOrderById(orderId)
        order.orderStatus=status
return await Order.findByIdAndUpdate(orderId,order,{new:true})  .populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ])

    }
      async cancelOrderStatus(orderId,userId){
         console.log("Received Order ID:", orderId);
        const order=await this.findOrderById(orderId)


        if(userId.toString()!==order.user.toString()){
            throw new Error("you cannot cancel this order")
        }
        order.orderStatus=orderStatus.CANCELLED
return await Order.findByIdAndUpdate(orderId,order,{new:true})  .populate([
            {path:"seller"},
            {path:"orderItems",populate:{path:"product"}},
            {path:"shippingAddress"}
        ])

    }

    async findOrderItemById(orderItemId){
        if(!mongoose.Types.ObjectId.isValid(orderItemId)){
            throw new Error("Invalid order item id")
        }
        const orderItem=await OrderItem.findById(orderItemId).populate("product")
        if(!orderItem){
            throw new Error("order item not found")
        } 
        return orderItem

    }



async createAddress(addressData, userId) {
    const address = new addressModel({
        ...addressData,
        user: userId,
    });

    await address.save();

    await UserModel.findByIdAndUpdate(
        userId,
        { $push: { addresses: address._id } }
    );

    return address;
}
async getUserAddresses(userId) {
    return await addressModel.find({ user: userId });
}
    
    

}
export default new OrderService()