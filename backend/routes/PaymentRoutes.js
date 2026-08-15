import express from "express";
import authMiddleware from "../middleware/auth.js";
import paymentSuccessHandler from "../controller/paymentController.js";

const router = express.Router();

router.get("/:paymentId", authMiddleware, paymentSuccessHandler);

export default router;