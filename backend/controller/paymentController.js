import CartModel from "../model/Cart.js"
import OrderService from "../service/OrderService.js"
import PaymentService from "../service/PaymentService.js"

import SellerService from "../service/SellerService.js"
import TransactionService from "../service/TransactionService.js"

const paymentSuccessHandler=async(req,res)=>{
const {paymentId}=req.params
const {paymentLinkId}=req.query
try{
const user=await req.user

const paymentOrder=await PaymentService.getPaymentOrderByPaymentLinkId(paymentLinkId)

const paymentSuccess=await PaymentService.proceedPaymentOrder(paymentOrder)

if(paymentSuccess){
    for(let orderId of paymentOrder.orders){
        const order=await OrderService.findOrderById(orderId)
await TransactionService.createTransaction(order)

        const seller=await SellerService.getSellerById(order.seller)
        const sellerReport=await SellerService.getSellerReport(seller)

        sellerReport.totalOrders+=1
        sellerReport.totalEarnings+=order.totalSellingPrice
        sellerReport.totalSales+=order.orderItems.length

        const updatedReport=await SellerService.updateSellerReport(sellerReport)
        console.log("updated report"+updatedReport)
    }
  
  
    return res.status(201).json({message:"payment successful"})
   
}
else{
    return res.status(400).json({
        message:"Payment failed"
    })
}
}catch(error){

    console.log("error",error)
 return res.status(500).json({
        message:error.message
    })
}
}


export default paymentSuccessHandler