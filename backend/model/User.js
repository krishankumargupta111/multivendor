import mongoose from "mongoose";
import userRoles from "../domain/UserRole.js";
import addressModel from "./Address.js";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    mobile:{
        type:String,
    },
    addresses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addressModel"
    },
    role:{
        type:String,
        enum:[userRoles.CUSTOMER,userRoles.ADMIN],
        default:userRoles.CUSTOMER
    }
})
const UserModel=mongoose.model("UserModel",userSchema)
export default UserModel