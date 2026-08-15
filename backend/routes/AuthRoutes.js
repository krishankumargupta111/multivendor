import express from 'express'
import authController from '../controller/authController.js'
const router=express.Router()
router.post("/sent/login-signup-otp",authController.sendLoginOtp)
router.post("/signup",authController.createUser)
router.post("/signin",authController.sigin)
export default router