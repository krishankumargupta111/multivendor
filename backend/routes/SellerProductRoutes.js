import express from 'express'
import sellerMiddleware from '../middleware/sellerAuth.js'
import productController from '../controller/productController.js'

const router=express.Router()
router.get('/',sellerMiddleware,productController.getProductBySellerId)
router.post('/',sellerMiddleware,productController.createProduct)
router.delete('/:productId',sellerMiddleware,productController.deleteProduct)
router.patch('/:productId',sellerMiddleware,productController.updateProduct)

export default router