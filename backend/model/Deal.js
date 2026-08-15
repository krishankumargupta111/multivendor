import { Schema } from "mongoose";
import mongoose from "mongoose";
import Category from "./Category.js";
const dealSchema=new mongoose.Schema({
    discount:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
})
const Deal=mongoose.model("Deal",dealSchema)
export default Deal