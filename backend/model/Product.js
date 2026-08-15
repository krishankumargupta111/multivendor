import { Schema } from "mongoose";
import mongoose from "mongoose";
import sellerModel from "./Seller.js";
const productSchema=new Schema({
   title:{
    type:String,
    required:true,
    trim:true
   },
      description:{
    type:String,
    required:true,
    trim:true
   },
   mrpPrice:{
type:Number,
require:true
   },
    sellingPrice:{
type:Number,
require:true
   },
    discountPercent:{
type:Number,
require:true
   },
    quantity:{
type:Number,
require:true
   },
    color:{
type:String,
require:true
   },
    images:{
type:[String]
   },
    category:{
type:mongoose.Schema.Types.ObjectId,
ref:"Category",
require:true
   },
   seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"sellerModel",
    required:true
   },
   size:{
    type:String,
    required:true
   }
})
const Product=mongoose.model("Product",productSchema)
export default Product