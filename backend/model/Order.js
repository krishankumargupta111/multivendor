import mongoose from "mongoose";
import UserModel from "./User.js";
import sellerModel from "./Seller.js";
import addressModel from "./Address.js";
import orderStatus from "../domain/OrderStatus.js";
import paymentStatus from "../domain/PaymentStatus.js";
const ordersSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },

    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sellerModel",
        required:true
    },
orderItems:[{
     type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
        required:true
}],
shippingAddress:{
     type:mongoose.Schema.Types.ObjectId,
        ref:"addressModel",
        required:true
},
totalMrpPrice:{
type:Number,
required:true
},
totalSellingPrice:{
type:Number,
required:true
},
discount:{
type:Number,

},
orderStatus:{
type:String,
enum:Object.values(orderStatus),
default:orderStatus.PENDING
},
totalItem:{

type:Number,
required:true},

paymentStatus:{
    type:String,
    enum:Object.values(paymentStatus),
    default:paymentStatus.PENDING

},
deliveryDate:{
    type:Date,
    default:function(){
        return Date.now() +7 *24 *60 *60*1000
    }
}


})
const Order=mongoose.model("Order",ordersSchema)
export default Order