import mongoose from "mongoose";
import { Schema } from "mongoose";
import Order from "./Order.js"
import UserModel from "./User.js";
import paymentStatus from "../domain/PaymentStatus.js";
const paymentOrderSchema=new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:Object.values(paymentStatus),
        default:paymentStatus.PENDING
    },
    paymentMethod:{
        type:String,
        default:"RAZORPAY"
    },
    paymentLinkId:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
ref:"UserModel",
required:true
    },
  
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
ref:"Order",

    }]
})
const PaymentOrder=mongoose.model("PaymentOrder",paymentOrderSchema)
export default PaymentOrder