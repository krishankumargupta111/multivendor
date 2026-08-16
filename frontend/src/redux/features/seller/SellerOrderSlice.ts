import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// ================= TYPES =================

interface SellerOrder {
  _id: string;
  orderStatus?: string;
  paymentStatus?: string;
  totalSellingPrice?: number;
  totalMrpPrice?: number;
  seller?: any;
  customer?: any;
  shippingAddress?: any;

  [key: string]: any;
}

interface SellerOrderState {
  orders: SellerOrder[];
  loading: boolean;
  error: string;
}

// ================= INITIAL STATE =================

const initialState: SellerOrderState = {
  orders: [],
  loading: false,
  error: "",
};

// ================= FETCH SELLER ORDERS =================

export const fetchSellerOrders = createAsyncThunk<any, any>(
  "/sellerOrders/fetchSellerOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/seller/orders`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(
        "fetch seller orders",
        response.data
      );

      return response.data;
    } catch (error: any) {
      console.log("error", error);

      return rejectWithValue(
        error.response?.data?.message ??
        error.message ??
        "Failed to fetch seller orders"
      );
    }
  }
);

// ================= UPDATE ORDER STATUS =================

export const updateOrderStatus = createAsyncThunk<any, any>(
  "/sellerOrders/updateOrderStatus",
  async (
    { jwt, orderId, orderStatus },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(
        "update seller orders",
        response.data
      );

      return response.data;
    } catch (error: any) {
      console.log("error", error.message);
      console.log(
        error.response?.status
      );
      console.log(
        error.response?.data
      );

      return rejectWithValue(
        error.response?.data?.message ??
        error.message ??
        "Failed to update order status"
      );
    }
  }
);

// ================= SLICE =================

const sellerOrderSlice = createSlice({
  name: "sellerOrders",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // ================= FETCH ORDERS =================

    builder
      .addCase(
        fetchSellerOrders.pending,
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )

      .addCase(
        fetchSellerOrders.fulfilled,
        (state, action) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )

      .addCase(
        fetchSellerOrders.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            (action.payload as string) ??
            action.error.message ??
            "";
        }
      );

    // ================= UPDATE ORDER =================

    builder
      .addCase(
        updateOrderStatus.pending,
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )

      .addCase(
        updateOrderStatus.fulfilled,
        (state, action) => {
          state.loading = false;

          const index =
            state.orders.findIndex(
              (order) =>
                order._id ===
                action.payload._id
            );

          if (index !== -1) {
            state.orders[index] =
              action.payload;
          }
        }
      )

      .addCase(
        updateOrderStatus.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            (action.payload as string) ??
            action.error.message ??
            "";
        }
      );
  },
});

export default sellerOrderSlice.reducer;