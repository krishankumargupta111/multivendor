import CouponService from "../service/CouponService.js";


class couponController{
async applyCouponController (req, res) {
  try {
    
    const { apply, code, orderValue } = req.query;

    if (!code || !orderValue) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const cartData = await CouponService.applyCoupon({ code, orderValue, apply });
    
    return res.status(200).json(cartData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }}


async  createCoupon (req, res) {
  try {
    const coupon = await CouponService.createCoupon(req.body);
    return res.status(201).json(coupon);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

async getAllCoupons (req, res)  {
  try {
    const coupons = await CouponService.getAllCoupons();
    return res.status(200).json(coupons);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

async deleteCoupon  (req, res) {
  try {
    const { id } = req.params;
    await CouponService.deleteCoupon(id);
    return res.status(200).json({ message: "Coupon deleted successfully", id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
};

export default new couponController()
