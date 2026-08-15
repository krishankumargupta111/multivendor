import express from 'express'

import sellerMiddleware from '../middleware/sellerAuth.js'
import TransactionController from '../controller/TransactionController.js'

const router=express.Router()
router.get('/seller',sellerMiddleware,TransactionController.getTransactionBySeller)
export default router