import addressModel from "../model/Address.js";
import sellerModel from "../model/Seller.js";
import sellerReport from "../model/SellerReport.js";
import { jwtProvider } from "../util/jwtProvider.js";

class SellerService{
async createSeller(sellerData){
    const existingSeller=await sellerModel.findOne({email:sellerData.email})
    if(existingSeller){
        throw new Error("email already exist")
    }
    let savedAddress=sellerData.pickupAddress
    savedAddress=await addressModel.create(sellerData.pickupAddress)
    console.log("sellerData:", sellerData);
console.log("bankDetail:", sellerData.bankDetail);
console.log("businessDetail:", sellerData.businessDetail);
    const newSeller=new sellerModel({
        sellerName:sellerData.sellerName,
        email:sellerData.email,
        password:sellerData.password,
        pickupAddress:savedAddress._id,
        GSTIN:sellerData.GSTIN,
        mobile:sellerData.mobile,
        bankDetail:sellerData.bankDetail,
        businessDetail:sellerData.businessDetails

    })
    return await newSeller.save()

}

    async getSellerProfile(jwt){
        const email=jwtProvider.getEmailFromJwt(jwt)
        return this.getSellerByEmail(email)

    }
    async getSellerByEmail(email){
        const seller=await sellerModel.findOne({email})
        if(!seller){
            throw new Error("seller not found")
        }
        return seller
    }

async getSellerById(id){
    const seller=await sellerModel.findById(id)
    if(!seller){
        throw new Error("seller not found")
    }
    return seller
}

async getAllSellers(status){
    return await sellerModel.find({accountStatus:status})
}
async updateSeller(existingSeller,sellerData){
    return await sellerModel.findByIdAndUpdate(existingSeller._id,sellerData,{
        new:true
    })
}
async updateSellerStatus(sellerId,status){
    return await sellerModel.findByIdAndUpdate(sellerId,
        {$set:{accountStatus:status}},
        {new:true}
    )
}

async deleteSeller(sellerId){
    return await sellerModel.findByIdAndDelete(sellerId)
}


  async getSellerReport(seller){
        try{
let SellerReport=await sellerReport.findOne({seller:seller._id})
console.log(SellerReport)
if(!SellerReport){
SellerReport=new sellerReport({
    seller:seller._id,
    totalOrders:0,
    totalEarnings:0,
    totalSales:0
})
SellerReport=await SellerReport.save()
}
return SellerReport
        }catch(error){
throw new Error(`Error fetching seller report ${error.message}`)
        }
    }

    async updateSellerReport(report){
        try{
return await sellerReport.findByIdAndUpdate(
   report._id,
   report,
    {new:true}
)
        }catch(error){
throw new Error(`Error updating seller report ${error.message}`)
        }
    }

}
export default new SellerService();






