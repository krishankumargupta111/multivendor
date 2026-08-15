import mongoose from "mongoose";
import { Schema } from "mongoose";

const verificationCodeSchema=new Schema({
    otp:{
        type:String,

    },
    email:{
        type:String,
        required:true
    },

})
const verificationCodeModel=mongoose.model("verificationCodeModel",
    verificationCodeSchema)
export default verificationCodeModel