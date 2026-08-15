import SellerService from "../service/SellerService.js"
import { jwtProvider } from "../util/jwtProvider.js"


const sellerMiddleware=async(req,res,next)=>{
    try{
const authHeader=req.headers.authorization
if(!authHeader ||!authHeader.startsWith('Bearer')){
    return res.status(401).json({message:"invalid token,authorization failed"})}
    const token=authHeader.split(" ")[1]
    console.log("Token:", token);
    if(!token){
      return res.status(401).json({message:"invalid token,authorization failed"})
    }

let email=jwtProvider.getEmailFromJwt(token)
const seller=SellerService.getSellerByEmail(email)
req.seller=seller
next()
    }catch(err){
        console.log(err)
 res.status(500).json({
    message:err.message})
    }
}
export default sellerMiddleware

  