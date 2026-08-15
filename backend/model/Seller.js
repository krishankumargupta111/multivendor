import mongoose from "mongoose";
import userRoles from "../domain/UserRole.js";
import AccountStatus from "../domain/AccountStatus.js";

const sellerSchema=new mongoose.Schema({
    sellerName:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    businessDetail:{
        businessName:{
            type:String,
            
        },
        businessEmail:{
            type:String,

        },
        businessMobile:{
            type:String,
        
        },
        businessAddress:{
            type:String
        }},
        bankDetail:{
            accountNumber:{
                type:String,
            },
            accountHolderName:{
                type:String,
            },
            bankName:{
                type:String,
            },
            ifscCode:{
                type:String
            }
        
    },
pickupAddress:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"addressModel"
},
GSTIN:{
    type:String,
required:true
},
role:{
    type:String,
    enum:[userRoles.SELLER],
    default:userRoles.SELLER
},
accountStatus:{
    type:String,
    enum:[AccountStatus.PENDING_VERIFICATION,
        AccountStatus.ACTIVE,
        AccountStatus.SUSPENDED,
        AccountStatus.DEACTIVATED,
        AccountStatus.BANNED,
        AccountStatus.CLOSED,
    ],
    default :AccountStatus.PENDING_VERIFICATION
}


},{timestamp:true})
const sellerModel=mongoose.model("sellerModel",sellerSchema)
export default sellerModel
