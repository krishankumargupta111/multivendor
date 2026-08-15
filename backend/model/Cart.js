import { Schema } from "mongoose";
import mongoose from "mongoose";
const cartSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'userModel',
        required:true
    },
    cartItems:[{
         type:Schema.Types.ObjectId,
        ref:'CartItem'
    }],
    totalSellingPrice:{
        type:Number,
        default:0
    },
    totalItem:{
        type:Number,
        default:0
    },
    totalMrpPrice:{
        type:Number,
        default:0
    },
    discount:{
        type:Number,
        default:0
    },
    couponCode:{
        type:String,
        default:null
    },
    couponPrice:{
        type:Number,
        default:0
    },
    shippingCharge: {
      type: Number,
      default: 0,
    },

},{timestamps:true})
const CartModel=mongoose.model("CartModel",cartSchema)
export default CartModel