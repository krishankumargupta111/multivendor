import CartModel from "../model/Cart.js";
import sellerModel from "../model/Seller.js";
import UserModel from "../model/User.js";
import verificationCodeModel from "../model/VerificationCode.js";
import generateOTP from "../util/generateOTP.js";
import { jwtProvider } from "../util/jwtProvider.js";
import sendVerificationEmail from "../util/sendEmail.js";
import SellerService from "./SellerService.js";
import bcrypt from 'bcrypt'
import userService from "./userService.js";

class AuthService{
async sendLoginOTP(email) {

    console.log("Email received:", email);

    const SIGNIN_PREFIX = "signin_";

    // LOGIN
    if (email.startsWith(SIGNIN_PREFIX)) {

        email = email.substring(SIGNIN_PREFIX.length);

        console.log("Login email:", email);

        const seller = await sellerModel.findOne({ email });
        const user = await UserModel.findOne({ email });

        console.log("Seller:", seller);
        console.log("User:", user);

        if (!seller && !user) {
            throw new Error("user not found");
        }
    }

    // Remove old OTP
    const existingVerificationCode =
        await verificationCodeModel.findOne({ email });

    if (existingVerificationCode) {
        await verificationCodeModel.deleteOne({ email });
    }

    // Generate OTP
    const otp = generateOTP();

    const verificationCode =
        new verificationCodeModel({
            otp,
            email
        });

    await verificationCode.save();

    const subject = "Bazar Login/Signup OTP";

    const body = `
Your OTP is ${otp}.
Please enter it to complete your login/signup process.
`;
console.log("1 - OTP saved");
console.log("2 - starting email");
    await sendVerificationEmail(
        email,
        subject,
        body
    );

    console.log("3 - email completed");

}

async createUser(req){

      console.log("Request Body:", req.body);
    const {email,fullName,otp}=req

    let user=await UserModel.findOne({email})
    if(user){
        throw new Error("User already exist with email")
     }
    const verificationCode=await verificationCodeModel.findOne({email})
    console.log("DB OTP:", verificationCode?.otp);
console.log("User OTP:", otp);
console.log("Equal:", String(verificationCode.otp) === String(otp));
    if(!verificationCode || String(verificationCode.otp)!==String(otp)){
        throw new Error("invalid otp")
    }
user=new UserModel({
        email,fullName
    })
    await user.save()
    const cart=new CartModel({user:user._id})
    await cart.save();
    return jwtProvider.createJwt({email})

}
async sigin(req){
    const {email,otp}=req
    const user=await UserModel.findOne({email})
    if(!user){
        throw new Error('user not found')
    }
    const verificationCode=await verificationCodeModel.findOne({email})
    if(!verificationCode || verificationCode.otp!==otp){

        throw new Error("invalid otp")
    }
    
    return{
        message:"Login success",
        jwt:jwtProvider.createJwt({email}),
        role:user.role
    }

}

}
export default new AuthService()






















