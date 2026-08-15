import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "/api/coupons"
export const applyCoupon = createAsyncThunk<any,any>(
  "coupon/applyCoupon",
  async ({ jwt, apply, code, orderValue }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}/apply`,
        {},
        {
          params: { apply, code, orderValue },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("apply coupon response:", response.data);
      return response.data;
    } catch (error: any) {
      console.log("apply coupon error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to apply coupon";
      return rejectWithValue(errorMessage);
    }
  }
);

interface CouponState {
  coupons: any[];
  cart: any;
  loading: boolean;
  error: string | null;
  couponCreated: boolean;
  couponsApplied: boolean;
  appliedCoupon: {
    couponCode: string;
    discountApplied: number;
    originalTotal: number;
    newTotal: number;
  } | null;
}

const initialState: CouponState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponCreated: false,
  couponsApplied: false,
  appliedCoupon: null, 
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        
        const isApplying = String(action.meta.arg.apply) === "true";

        if (isApplying) {
          state.couponsApplied = true;
         
          state.appliedCoupon = action.payload; 
        } else {
          state.couponsApplied = false;
          state.appliedCoupon = null;
        }
      })

     
      .addCase(applyCoupon.rejected, (state, action: any) => {
        state.loading = false;
        state.couponsApplied = false;
        state.appliedCoupon = null;
        state.error = action.payload || "Failed to apply coupon";
      });
  },
});

export default couponSlice.reducer;