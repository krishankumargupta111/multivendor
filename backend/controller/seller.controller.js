import userRoles from "../domain/UserRole.js"
import verificationCodeModel from "../model/VerificationCode.js"
import SellerService from "../service/SellerService.js"
import { jwtProvider } from "../util/jwtProvider.js"

class SellerController{
    async getSellerProfile(req,res){
        try{const profile=await req.seller
            console.log('profile',profile)

const jwt=req.headers.authorization.split(' ')[1]
const seller=await SellerService.getSellerProfile(jwt)
res.status(200).json(seller)
        }catch(err){
res.status(err instanceof Error ?404:500).json({
    message:err.message})
        } 
    }

       async createSeller(req,res){
        try{
const seller=await SellerService.createSeller(req.body)
res.status(200).json({message:"seller created successfully"})
        }catch(err){
res.status(err instanceof Error ?404:500).json({
    message:err.message})
        }
    }
       async getAllSellers(req,res){
        try{
            const status =req.query.status
const sellers=await SellerService.getAllSellers(status)
res.status(200).json(sellers)
        }catch(err){
res.status(err instanceof Error ?404:500).json({
    message:err.message})
        }
    }
      async updateSeller(req,res){
        try{
            const existingSeller = await req.seller
const seller=await SellerService.updateSeller(existingSeller,
    req.body)
res.status(200).json(seller)
        }catch(err){
res.status(err instanceof Error ?404:500).json({
    message:err.message})
        }
    }
       async deleteSeller(req,res){
        try{
        
await SellerService.deleteSeller(req.params.id)
    
res.status(200).json({message:"seller deleted successfully"})
        }catch(err){
res.status(err instanceof Error ?404:500).json({
    message:err.message})
        }
    }
    async updateSellerAccountStatus(req,res){
        try{
const updatedSeller=await SellerService.updateSellerStatus(
    req.params.id,
    req.params.status)
    res.status(200).json(updatedSeller)

        }catch(err){
            res.status(err instanceof Error ?404:500).json({
    message:err.message})
        }
    }
    async verifyLoginOtp(req,res){
        try{
const {otp,email}=req.body
const seller=await SellerService.getSellerByEmail(email)
const verificationCode=await verificationCodeModel.
findOne({email})
if(!verificationCode || verificationCode.otp !=otp){
    throw new Error("invalid otp")
}
const token=jwtProvider.createJwt({email})
const authResponse={
    message:'Login Success',
    jwt:token,
    role:userRoles.SELLER
}
return res.status(200).json({authResponse})
        }catch(err){
  res.status(err instanceof Error ?404:500).json({
    message:err.message})
        }
    }

    

        async getSellerReport(req,res){
            try{
    const seller=await req.seller
    const report=await SellerService.getSellerReport(seller._id)
    res.status(200).json(report)
            }catch(error){
    res.status(400).json({error:error.message})
            }   
         }
    
}
export default new SellerController()