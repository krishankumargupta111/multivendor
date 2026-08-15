import mongoose, { Schema } from "mongoose";
import UserModel from "./User.js";
import Order from "./Order.js";
import sellerModel from "./Seller.js";
const transactionSchema=new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",required:true,
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",required:true,
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sellerModel",required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})

const Transaction=mongoose.model("Transaction",transactionSchema)
export default Transaction