import mongoose from "mongoose"

const addressSchema=new mongoose.Schema({
    name:{type:'String'},
     locality:{type:'String'},
      pincode:{type:'Number'},
       state:{type:'String'},
        address:{type:'String'},
       mobile:{type:'String'},
    
    
},{
timestamps:true
})
const addressModel=mongoose.model("addressModel",addressSchema)
export default addressModel