import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../util/sumCardItemPrice";
import { fetchCart } from "../../../redux/features/customer/CartSlice";

function PricingCard() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((store) => store.cart);
  const couponState = useAppSelector((store) => store.coupon);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      dispatch(fetchCart(jwt));
    }
  }, [dispatch]);

  // If cartItems is undefined, use an empty array
  const cartItems = cart.cart?.cartItems ?? [];

  const mrpPrice = sumCartItemMrpPrice(cartItems);
  const sellingPrice = sumCartItemSellingPrice(cartItems);

  const itemDiscount = mrpPrice - sellingPrice;
  const shippingFee = 79;

  const isCouponApplied = couponState?.couponsApplied;

  const couponDiscount = isCouponApplied
    ? couponState?.appliedCoupon?.discountApplied ?? 0
    : 0;

  const totalPayable =
    sellingPrice + shippingFee - couponDiscount;

  return (
    <>
      {cart.cart && (
        <div>
          <div className="space-y-3 p-5">

            <div className="flex justify-between items-center">
              <span>Subtotal (MRP)</span>
              <span>₹{mrpPrice}</span>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span>Product Discount</span>
              <span className="text-green-600">
                - ₹{itemDiscount}
              </span>
            </div>

            {isCouponApplied && (
              <div className="flex justify-between items-center text-green-600 font-medium">
                <span>
                  Coupon Discount (
                  {couponState?.appliedCoupon?.couponCode}
                  )
                </span>

                <span>
                  - ₹{couponDiscount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span>Shipping</span>
              <span>₹{shippingFee}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Platform Fee</span>
              <span className="text-green-600 font-medium">
                Free
              </span>
            </div>
          </div>

          <Divider />

          <div className="font-bold text-base px-5 py-3 flex justify-between items-center text-gray-900">
            <span>Total</span>

            <span className="text-primary-main">
              ₹{totalPayable.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default PricingCard;