import UserModel from "../model/User.js";
import { jwtProvider } from "../util/jwtProvider.js";

class UserService{
    async findUserProfileByJwt(jwt){
        const email=jwtProvider.getEmailFromJwt(jwt)
const user=await UserModel.findOne({email})
if(!user){
    throw new UserError(`user doe not exist with email ${email}`)

}
return user
    }

    async findUserByEmail(email){
const user=await UserModel.findOne({email})
if(!user){
    throw new UserError(`user does not exist with email ${email}`)

}
return user
}
}
export default new UserService();