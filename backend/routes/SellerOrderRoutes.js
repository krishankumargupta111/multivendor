import express from 'express'
import sellerMiddleware from '../middleware/sellerAuth.js'
import orderController from '../controller/orderController.js'



const router=express.Router()
router.get('/',sellerMiddleware,orderController.getSellerOrders)
router.patch(
    '/:orderId/status/:orderStatus',sellerMiddleware,orderController.updateOrderStatus
)



export default router