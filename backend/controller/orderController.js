import CartService from "../service/CartService.js"
import OrderService from "../service/OrderService.js"
import PaymentService from "../service/PaymentService.js"
import PaymentOrder from "../model/PaymentOrder.js"

class OrderController{

  async createOrder(req, res) {
    const { addressId } = req.body;
    const { paymentMethod } = req.query;

    try {
        console.log("paymentMethod:", paymentMethod);
        const user = await req.user;
        
        const cart = await CartService.findUserCart(user);
console.log("req.body:", req.body);
        const orders = await OrderService.createOrder(
            user,
            addressId,
            cart
        );

        const paymentOrder = await PaymentService.createOrder(user, orders);

        const response = {};

        if (paymentMethod === "RAZORPAY") {

            const payment = await PaymentService.createRazorpayPaymentLink(
                user,
                paymentOrder.amount,
                paymentOrder._id
            );

            response.payment_link_url = payment.short_url;
            response.paymentLinkId = payment.id;

            console.log("Response:", response);
            paymentOrder.paymentLinkId = payment.id;

            await PaymentOrder.findByIdAndUpdate(
                paymentOrder._id,
                paymentOrder
            );
        }

        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
            

        return res.status(500).json({
            message: `Error creating order: ${error.message}`,
        });
    }
}

    async getOrderById(req,res){
        try{
const{orderId}=req.params
const order=await OrderService.findOrderById(orderId)
return res.status(200).json(order)
        }catch(error){
            console.log(error)
return res.status(401).json({error:error.message})
        }
    }
    async getUserOrderHistory(req,res){
        const user=await req.user
        try{

const orderHistory=await OrderService.usersOrderHistory(user._id)
return res.status(200).json(orderHistory)
        }catch(error){
            console.log(error)
return res.status(401).json({error:error.message})
        }
    }

      async getSellerOrders(req,res){
        try{
const seller= await req.seller
console.log("sellerId",seller)
const orders=await OrderService.getSellerOrder(seller._id)
return res.status(200).json(orders)
        }catch(error){
            console.log(error)
return res.status(401).json({error:error.message})
        }
    }
      async updateOrderStatus(req,res){
        try{
            
const{orderId,orderStatus}=req.params
const updateOrder=await OrderService.updateOrderStatus(
    orderId,
    orderStatus
)
return res.status(200).json(updateOrder)
        }catch(error){
            console.log(error)
return res.status(401).json({error:error.message})
        }
    }
       async cancelOrder(req,res){
        try{
const{orderId}=req.params
const userId=req.user._id
console.log("bqefbqcc",userId)
const cancelOrder=await OrderService.cancelOrderStatus(
    orderId,
    userId
)
return res.status(200).json({message:"order cancelled successfully",
    order:cancelOrder
})

}catch(error){
            console.log(error)
return res.status(401).json({error:error.message})
        }
    }
     async getOrderItemById(req,res){
        try{
const{orderItemId}=req.params
const orderItem=await OrderService.findOrderItemById(orderItemId)
return res.status(200).json(orderItem)
        }catch(error){
            console.log(error)
return res.status(401).json({error:error.message})
        }
    }



     async createAddress(req, res) {
    try {
      const user = req.user;

      const address = await OrderService.createAddress(
        req.body,
        user._id
      );

      return res.status(201).json({
        success: true,
        message: "Address added successfully",
        address,
      });
    } catch (error) {
      console.log("Create Address Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserAddresses(req, res) {
    try {
        const addresses = await OrderService.getUserAddresses(req.user._id);

        return res.status(200).json(addresses);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

    
}





export default new OrderController()