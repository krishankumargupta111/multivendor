import mongoose from 'mongoose'
import DataInitializeService from '../service/DataInitializeService.js'
const connectDb=async()=>{
    try{
const conn=await mongoose.connect(process.env.MONGODB_URL)
DataInitializeService.initializeAdminUser()
console.log("mongodb connected")
    }catch(error){
console.log(error)
    }
}
export default connectDb