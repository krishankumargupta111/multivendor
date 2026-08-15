import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  orders: [],
  loading: true,
  error: "",
};

export const fetchSellerOrders = createAsyncThunk<any, any>(
  "/sellerOrders/fetchSellerOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/seller/orders`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("fetch seller orders", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

export const updateOrderStatus = createAsyncThunk<any, any>(
  "/sellerOrders/updateOrderStatus",
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      console.log("update seller orders", response.data);
      return response.data;
    }  catch (error: any) {
  console.log(error.message);
  console.log(error.response?.status);
  console.log(error.response?.data);
}
  },
);

const sellerOrderSlice = createSlice({
  name: "sellerOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellerOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSellerOrders.fulfilled, (state, action) => {
      state.loading = false
      state.orders = action.payload
    });
    builder.addCase(fetchSellerOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateOrderStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = false;
      const index=state.orders
      .findIndex((order:any)=>order._id===action.payload._id)
      state.orders[index]=action.payload
      
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default sellerOrderSlice.reducer
