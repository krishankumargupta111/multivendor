import express from 'express'
import authMiddleware from '../middleware/auth.js'
import cartController from '../controller/cartController.js'

const router=express.Router()
router.get('/',authMiddleware,cartController.findUserCartHandler)
router.put('/add',authMiddleware,cartController.addItemToCart)
router.delete('/item/:cartItemId',authMiddleware,cartController.deleteCartItemHandler)
router.put('/item/:cartItemId',authMiddleware,cartController.updateCartItem)

export default router