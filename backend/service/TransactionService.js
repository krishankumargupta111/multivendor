import Order from "../model/Order.js";
import sellerModel from "../model/Seller.js";
import Transaction from "../model/Transaction.js";

class TransactionService{
    async createTransaction(orderId){
       
 const existingTransaction = await Transaction.findOne({ order: orderId });

    if (existingTransaction) {
        return existingTransaction;
    }

         
        const order=await Order.findById(orderId).populate('seller')


if(!order){
    throw new Error('order not found')
}
const seller=await sellerModel.findById(order.seller._id)

if(!seller){
    throw new Error('seller not found')
}


const transaction=new Transaction({
    seller:seller._id,
    customer:order.user,
    order:order._id
})
return await transaction.save()
    }

async getTransactionBySellerId(sellerId){
    return await Transaction.find({seller:sellerId}).populate('order')

}
async getAllTransaction(){
    return await Transaction.find().populate('seller order customer')
}
}


export default new TransactionService()