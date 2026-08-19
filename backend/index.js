import dotenv from "dotenv"
dotenv.config();
import express from 'express'
const app=express()

import connectDb from './db/db.js'
import cors from 'cors'

app.use(
  cors({
  // origin:process.env.VITE,
    // credentials: true,
  })
);
const port=process.env.PORT
app.use(express.json());



import sellerRoutes from "./routes/SellerRoutes.js"
import adminRoutes from "./routes/AdminRoutes.js"
import authRoutes from "./routes/AuthRoutes.js"
import userRoutes from "./routes/UserRoutes.js"
import productRoutes from "./routes/ProductRoutes.js"
import cartRoutes from "./routes/CartRoutes.js"
import orderRoutes from "./routes/OrderRoutes.js"
import sellerOrderRoutes from "./routes/SellerOrderRoutes.js"
import sellerProductsRoutes from "./routes/SellerProductRoutes.js"
import paymentRoutes from "./routes/PaymentRoutes.js"
import transactionRoutes from "./routes/TransactionRoutes.js"

import homeCategoryRoutes from "./routes/HomeCategoryRoutes.js"
import dealRoutes from "./routes/DealRoute.js"
import couponRoutes from "./routes/CouponRoutes.js"
import categoryRoutes from "./routes/CategoriesRoutes.js"

import bodyParser from 'body-parser'
app.use("/sellers",sellerRoutes)
app.use("/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/sellers/products",sellerProductsRoutes)
app.use("/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/seller/orders",sellerOrderRoutes)
app.use("/api/payment",paymentRoutes)
app.use("/api/transactions",transactionRoutes)

app.use("/home",homeCategoryRoutes)
app.use("/admin/deals",dealRoutes)
app.use("/admin",adminRoutes)
app.use("/api/coupons",couponRoutes)
app.use("/api/categories",categoryRoutes)








app.listen(port,async()=>{
    console.log(`Server is running on port ${port}`)
    await connectDb()
})
