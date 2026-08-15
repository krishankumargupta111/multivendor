import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "/api/coupons";

export const createCoupon = createAsyncThunk<any, { coupon: any; jwt: string | null }>(
  "coupon/createCoupon",
  async ({ coupon, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/admin/create`, coupon, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAllCoupon = createAsyncThunk<any, string | null>(
  "coupon/fetchAllCoupon",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/admin/all`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCoupon = createAsyncThunk<any, { id: string; jwt: string | null }>(
  "coupon/deleteCoupon",
  async ({ jwt, id }, { rejectWithValue }) => {
    try {
     
      const response = await api.delete(`${API_URL}/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

interface CouponState {
  coupons: any[];
  loading: boolean;
  error: string;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: "",
};

const couponSlice = createSlice({
  name: "adminCoupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE COUPON
    builder.addCase(createCoupon.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons.push(action.payload);
    });
    builder.addCase(createCoupon.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    // FETCH ALL COUPONS
    builder.addCase(fetchAllCoupon.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchAllCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = Array.isArray(action.payload) ? action.payload : [];
    });
    builder.addCase(fetchAllCoupon.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || action.error.message || "Failed to fetch coupons";
    });

    // DELETE COUPON
    builder.addCase(deleteCoupon.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteCoupon.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = state.coupons.filter(
        (coupon: any) => coupon._id !== action.meta.arg.id
      );
    });
    builder.addCase(deleteCoupon.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || action.error.message || "Failed to delete coupon";
    });
  },
});

export default couponSlice.reducer;