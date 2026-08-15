

import {configureStore,combineReducers}from '@reduxjs/toolkit'

import authReducer from "./features/Auth/AuthSlice"
import userReducer from "./features/customer/UserSlice"
import productReducer from "./features/customer/ProductSlice"
import orderReducer from "./features/customer/OrderSlice"
import cartReducer from "./features/customer/CartSlice"
import couponReducer from "./features/customer/CouponSlice"
import homeCategoryReducer from "./features/customer/HomeCategorySlice"
import sellerAuthReducer from "./features/seller/SellerAuthentication"
import sellerOrderReducer from "./features/seller/SellerOrderSlice"
import sellerReducer from "./features/seller/SellerSlice"
import transactionReducer from "./features/seller/TransactionSlice"
import sellerProductReducer from "./features/seller/SellerProductSlice"
import adminReducer from "./features/admin/AdminSlice"
import dealReducer from "./features/admin/DealSlice"
import AdmincouponReducer from "./features/admin/CouponSlice"
import categoryReducer from "./features/admin/CategorySlice"
import paymentReducer from "./features/seller/SellerPayment"

import {useDispatch, useSelector, type TypedUseSelectorHook} from 'react-redux'
const rootReducer=combineReducers({
auth:authReducer,
user:userReducer,
product:productReducer,
order:orderReducer,
cart:cartReducer,
coupon:couponReducer,
homeCategory:homeCategoryReducer,


sellerAuth:sellerAuthReducer,
sellerOrder:sellerOrderReducer,
sellerProduct:sellerProductReducer,
seller:sellerReducer,
transaction:transactionReducer,
sellerPayment:paymentReducer,

admin:adminReducer,
deal:dealReducer,
adminCoupon:AdmincouponReducer,
category: categoryReducer,
})
const store=configureStore({
reducer:rootReducer,
middleware:(getDefaultMiddleware)=>getDefaultMiddleware()

})

export type AddDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof rootReducer>
export const useAppDispatch=()=>useDispatch<AddDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector
export default store

