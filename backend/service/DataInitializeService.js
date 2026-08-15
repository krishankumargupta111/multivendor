import UserModel from "../model/User.js"
import bcrypt from 'bcrypt'
class DataIntializationService{
async initializeAdminUser(){
    const adminEmail=process.env.ADMIN_EMAIL
    const adminPassword=process.env.ADMIN_PASSWORD

    try{
const adminExist=await UserModel.findOne({email:adminEmail})
if(!adminExist){
    const hashedPassword=await bcrypt.hash(adminPassword,10)



const adminUser=new UserModel({
    fullName:'Krishan123',
    email:adminEmail,
    password:hashedPassword,
    role:'ROLE_ADMIN'
})

await adminUser.save()
console.log('Admin user created sucessfully')
}else{
    console.log('Admin user already exist')
}


    }catch(error){
console.log('Error during admin ',error)
    }
}
}

export default new DataIntializationService()