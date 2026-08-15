import mongoose from "mongoose";
import sellerModel from "./Seller.js";

const sellerReportSchema=new mongoose.Schema({
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sellerModel',
        required:true
    },totalEarnings:{
        type:Number,
        default:0
    },
    totalSales:{
        type:Number,
        defualt:0
    },
     totalRefunds:{
        type:Number,
        defualt:0
    },
     totalTax:{
        type:Number,
        defualt:0
    },
     netEarnings:{
        type:Number,
        defualt:0
    },
     totalOrders:{
        type:Number,
        defualt:0
    },
 cancelOrders:{
        type:Number,
        defualt:0
    },
     totalTransactions:{
        type:Number,
        defualt:0
    },
},{timestamps:true})

const sellerReport=mongoose.model("sellerReport",sellerReportSchema)
export default sellerReport