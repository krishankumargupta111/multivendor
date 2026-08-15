import userRoles from "../domain/UserRole.js"
import AuthService from "../service/AuthService.js"

class AuthController{
 async sendLoginOtp(req,res){
        try{
            const email=req.body.email
await AuthService.sendLoginOTP(email)
res.status(200).json({message:"otp sent successfully"})
        }catch(err){
res.status(err instanceof Error ?404:500).json({
    message:err.message})
        }
    }
    
    async createUser(req,res){
        try{
           console.log("BODY:", req.body);

 const jwt=await AuthService.createUser(req.body)
const authres={
    jwt,
    message:"User created sucessfully",
    role:userRoles.CUSTOMER
}
res.status(200).json(authres)
        }catch(err){
            console.log(err)
res.status(err instanceof Error ?404:500).json({
    message:err.message})
        }
    }
    async sigin(req,res){
        try{
 const authres=await AuthService.sigin(req.body)
res.status(200).json(authres)
        }catch(err){
res.status(err instanceof Error ?404:500).json({
    message:err.message})
        }
    }

}
export default new AuthController()