import express from 'express'

import authMiddleware from '../middleware/auth.js'
import couponController from '../controller/couponController.js';


const router=express.Router()
router.post('/apply',authMiddleware,couponController.applyCouponController)
router.post("/admin/create", authMiddleware,couponController.createCoupon);
router.get("/admin/all", authMiddleware, couponController.getAllCoupons);
router.delete("/admin/delete/:id", authMiddleware,couponController.deleteCoupon);


export default router