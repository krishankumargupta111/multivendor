import { useEffect, useState } from 'react'
import CartItemCard from './CartItemCard'
import { Favorite, LocalOffer } from '@mui/icons-material'
import { Button, TextField, Chip } from '@mui/material'
import PricingCard from './PricingCard'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { fetchCart } from '../../../redux/features/customer/CartSlice'
import { useNavigate } from 'react-router'
import { applyCoupon } from '../../../redux/features/customer/CouponSlice'

function Cart() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const cart = useAppSelector(store => store.cart)
  const couponState = useAppSelector(store => store.coupon) 
  
  const [couponCode, setCouponCode] = useState("")

  useEffect(() => {
    dispatch(fetchCart(localStorage.getItem("jwt")))
  }, [dispatch])


  const calculateOrderValue = () => {
    if (cart.cart?.totalSellingPrice && cart.cart.totalSellingPrice > 0) {
      return cart.cart.totalSellingPrice
    }
    return cart.cart?.cartItems?.reduce((acc: number, item: any) => {
      return acc + (item.sellingPrice || 0) * (item.quantity || 1)
    }, 0) || 0
  }

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    dispatch(applyCoupon({
      jwt: localStorage.getItem("jwt"),
      apply: "true",
      code: couponCode.toUpperCase().trim(),
      orderValue: calculateOrderValue(),
    }))
  }

  const handleRemoveCoupon = () => {
    const activeCode = couponState.appliedCoupon?.couponCode || couponCode;

    dispatch(applyCoupon({
      jwt: localStorage.getItem("jwt"),
      apply: "false",
      code: activeCode.trim(),
      orderValue: calculateOrderValue(),
    }))
    
    setCouponCode("") 
  }

  return (
    <div className='pt-10 px-5 sm:px-10 md:px-60 min-h-screen'>
      {cart.cart?.cartItems && cart.cart.cartItems.length > 0 ? (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
       
          <div className='lg:col-span-2 space-y-3'>
            {cart.cart.cartItems.map((item: any) => (
              <CartItemCard key={item._id} item={item} />
            ))}
          </div>

         
          <div className='col-span-1 text-sm space-y-3'>
          
            <div className='border border-gray-300 rounded-md px-5 py-3 space-y-4'>
              <div className='flex gap-3 text-sm items-center font-medium'>
                <LocalOffer color="primary" sx={{ fontSize: "17px" }} />
                <span>Apply Coupons</span>
              </div>

              <div className='flex justify-between items-center gap-2'>
                <TextField 
                  placeholder='Coupon Code' 
                  size='small' 
                  fullWidth
                  value={
                    couponState.couponsApplied 
                      ? couponState.appliedCoupon?.couponCode || couponCode 
                      : couponCode
                  }
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponState.loading || couponState.couponsApplied}
                />
                
                {couponState.couponsApplied ? (
                  <Button 
                    size='small' 
                    color="error"
                    variant="outlined"
                    onClick={handleRemoveCoupon}
                    disabled={couponState.loading}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button 
                    size='small' 
                    variant="contained"
                    onClick={handleApplyCoupon}
                    disabled={couponState.loading || !couponCode.trim()}
                  >
                    Apply
                  </Button>
                )}
              </div>
              
              {/* Error Message */}
              {couponState.error && (
                <p className="text-red-500 text-xs m-0">{couponState.error}</p>
              )}

              {/* Success Badge & Discount Amount */}
              {couponState.couponsApplied && (
                <div className="flex items-center justify-between pt-1">
                  <Chip 
                    label={`Applied: ${couponState.appliedCoupon?.couponCode}`} 
                    color="success" 
                    size="small" 
                    variant="outlined" 
                  />
                  <span className="text-green-600 text-xs font-semibold">
                    Saved ₹{couponState.appliedCoupon?.discountApplied}
                  </span>
                </div>
              )}
            </div>

            {/* Pricing Details Section */}
            <section className='border border-gray-300 rounded-md'>
              <PricingCard />
              <div className='p-5'>
                <Button 
                  onClick={() => navigate("/checkout/address")}
                  sx={{ py: "11px" }} 
                  fullWidth 
                  variant='contained'
                >
                  Buy Now
                </Button>
              </div>
            </section>

            {/* Wishlist Link */}
            <div className='border border-gray-300 rounded-md px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition'>
              <span>Add From Wishlist</span>
              <Favorite color='primary' />
            </div>

          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h1 className='text-2xl font-semibold text-gray-700'>Cart is Empty</h1>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }} 
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  )
}

export default Cart