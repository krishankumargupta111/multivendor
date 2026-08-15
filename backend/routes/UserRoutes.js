import express from 'express'
import { Router } from 'express'
import getUserProfileByJwt from '../controller/userController.js'
import authMiddleware from '../middleware/auth.js'
const router=express.Router()
router.get('/profile',authMiddleware,getUserProfileByJwt)
export default router