import express from 'express'
import orderController from '../controller/orderController.js'
import authMiddleware from '../middleware/auth.js'


const router=express.Router()
router.post('/',authMiddleware,orderController.createOrder)
router.get('/user',authMiddleware,orderController.getUserOrderHistory)
router.put('/:orderId/cancel',authMiddleware,orderController.cancelOrder)
router.get('/:orderId',authMiddleware,orderController.getOrderById)
router.get('/item/:orderItemId',authMiddleware,orderController.getOrderItemById)
router.post('/addAddress',authMiddleware,orderController.createAddress)
router.get('/',authMiddleware,orderController.getUserAddresses)



export default router