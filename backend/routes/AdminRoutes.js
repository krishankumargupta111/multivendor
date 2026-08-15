import express from 'express'
import sellerController from '../controller/seller.controller.js'
const router=express.Router()
router.patch("/seller/:id/status/:status",sellerController.updateSellerAccountStatus)
export default router