import {Coupon} from "../model/Coupon.js";

class CouponService{
  async applyCoupon ({ code, orderValue, apply }){
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
      throw new Error("Invalid or inactive coupon code");
    }


    if (new Date() > new Date(coupon.expiryDate)) {
      throw new Error("This coupon has expired");
    }


    if (Number(orderValue) < coupon.minOrderValue) {
      throw new Error(`Minimum order value of $${coupon.minOrderValue} required`);
    }

   
    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (Number(orderValue) * coupon.discountValue) / 100;
    } else if (coupon.discountType === "fixed") {
      discount = coupon.discountValue;
    }

    const finalOrderValue = Math.max(0, Number(orderValue) - discount);


    return {
      originalTotal: Number(orderValue),
      discountApplied: apply === "true" ? discount : 0,
      newTotal: apply === "true" ? finalOrderValue : Number(orderValue),
      couponCode: code,
      isValid: true
    };
  }

 async createCoupon(couponData) {
    const existingCoupon = await Coupon.findOne({
      code: couponData.code.toUpperCase(),
    });

    if (existingCoupon) {
      throw new Error("Coupon code already exists");
    }

    const coupon = new Coupon({
      ...couponData,
      code: couponData.code.toUpperCase(),
    });

    return await coupon.save();
  }

  async getAllCoupons() {
    return await Coupon.find().sort({ createdAt: -1 });
  }

  async deleteCoupon(couponId) {
    const coupon = await Coupon.findByIdAndDelete(couponId);
    if (!coupon) {
      throw new Error("Coupon not found");
    }
    return coupon;
  }

}

export default new CouponService()