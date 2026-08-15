import Razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config();

console.log("KEY_ID:", process.env.API_KEY);
console.log("KEY_SECRET:", process.env.API_SECRET);
const razorpay=new Razorpay({
    key_id:process.env.API_KEY,
    key_secret:process.env.API_SECRET
})
export default razorpay