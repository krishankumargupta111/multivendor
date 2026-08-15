import { Schema } from "mongoose";
import mongoose from "mongoose";

const cartItemSchema=new Schema({
    cart:{
        type:Schema.Types.ObjectId,
        ref:"CartModel",
        required:true
    },
    product:{
       type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    size:{
        type:String,
    required:true
   
},
quantity:{
    type:Number,
    required:true,
    default:1
},
mrpPrice:{
    type:Number,
    required:true
},
sellingPrice:{
    type:Number,
    required:true
},
userId:{
    type:String,
    required:true
}
})
const CartItem=mongoose.model("CartItem",cartItemSchema)
export default CartItem