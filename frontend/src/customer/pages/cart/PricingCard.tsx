import { Divider } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from '../../../util/sumCardItemPrice'
import { fetchCart } from '../../../redux/features/customer/CartSlice'

function PricingCard() {
  const dispatch = useAppDispatch()

  // 1. Select both cart and coupon from Redux state
  const cart = useAppSelector((store) => store.cart)
  const couponState = useAppSelector((store) => store.coupon)

  useEffect(() => {
    dispatch(fetchCart(localStorage.getItem("jwt")))
  }, [dispatch])

  // 2. Base calculations from cart items
  const mrpPrice = sumCartItemMrpPrice(cart.cart?.cartItems)
  const sellingPrice = sumCartItemSellingPrice(cart.cart?.cartItems)
  const itemDiscount = mrpPrice - sellingPrice
  const shippingFee = 79

  // 3. Coupon calculations
  const isCouponApplied = couponState?.couponsApplied
  const couponDiscount = isCouponApplied ? (couponState?.appliedCoupon?.discountApplied || 0) : 0

  // 4. Final price calculation
  const totalPayable = sellingPrice + shippingFee - couponDiscount

  return (
    <>
      {cart.cart ? (
        <div>
          <div className='space-y-3 p-5'>
            {/* MRP Subtotal */}
            <div className='flex justify-between items-center'>
              <span>Subtotal (MRP)</span>
              <span>₹{mrpPrice}</span>
            </div>

            {/* Product Discount */}
            <div className='flex justify-between items-center text-gray-600'>
              <span>Product Discount</span>
              <span className='text-green-600'>- ₹{itemDiscount}</span>
            </div>

            {/* Coupon Discount (Only shows if a coupon is active) */}
            {isCouponApplied && (
              <div className='flex justify-between items-center text-green-600 font-medium'>
                <span>Coupon Discount ({couponState?.appliedCoupon?.couponCode})</span>
                <span>- ₹{couponDiscount.toFixed(2)}</span>
              </div>
            )}

            {/* Shipping */}
            <div className='flex justify-between items-center'>
              <span>Shipping</span>
              <span>₹{shippingFee}</span>
            </div>

            {/* Platform Fee */}
            <div className='flex justify-between items-center'>
              <span>Platform Fee</span>
              <span className='text-green-600 font-medium'>Free</span>
            </div>
          </div>

          <Divider />

          {/* Final Total Amount */}
          <div className='font-bold text-base px-5 py-3 flex justify-between items-center text-gray-900'>
            <span>Total</span>
            <span className='text-primary-main'>₹{totalPayable.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}

export default PricingCard