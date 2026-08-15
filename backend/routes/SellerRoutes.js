import express from 'express'
import sellerController from '../controller/seller.controller.js'
import sellerMiddleware from '../middleware/sellerAuth.js'

const router=express.Router()
router.get("/profile",sellerMiddleware,sellerController.getSellerProfile)
router.post("/",sellerController.createSeller)
router.get("/",sellerController.getAllSellers)
router.patch("/",sellerMiddleware,sellerController.updateSeller)
router.post("/verify/login-otp",sellerController.verifyLoginOtp)
router.get("/report",sellerMiddleware,sellerController.getSellerReport)
export default router