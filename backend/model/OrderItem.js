import Product from "./Product.js";
import mongoose from "mongoose";

import { Schema } from "mongoose";

const orderItemSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    size:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    mrpPrice:{
          type:Number,
        required:true
    },
    sellingPrice:{
          type:Number,
        required:true
    }
})
const OrderItem=mongoose.model("OrderItem",orderItemSchema)
export default OrderItem