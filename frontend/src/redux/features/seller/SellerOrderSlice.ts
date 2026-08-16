import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// ================= TYPES =================

interface Product {
  _id?: string;
  title?: string;
  color?: string;
  images?: string[];
}

interface OrderItem {
  _id?: string;
  product?: Product;
  quantity?: number;
  sellingPrice?: number;
  size?: string;
}

interface ShippingAddress {
  _id?: string;
  address?: string;
  locality?: string;
  city?: string;
  state?: string;
  pincode?: string;
  pinCode?: string;
}

interface SellerOrder {
  _id: string;

  orderItems: OrderItem[];

  orderStatus?: string;
  paymentStatus?: string;

  totalSellingPrice?: number;
  totalMrpPrice?: number;

  seller?: unknown;
  customer?: unknown;

  shippingAddress?: ShippingAddress;
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

export const fetchSellerOrders = createAsyncThunk<
  SellerOrder[],
  string | null
>(
  "/sellerOrders/fetchSellerOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/api/seller/orders",
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

      return response.data as SellerOrder[];
    } catch (error: unknown) {
      console.log("error", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        return rejectWithValue(
          axiosError.response?.data?.message ??
            "Failed to fetch seller orders"
        );
      }

      return rejectWithValue(
        "Failed to fetch seller orders"
      );
    }
  }
);

// ================= UPDATE ORDER STATUS =================

export const updateOrderStatus = createAsyncThunk<
  SellerOrder,
  {
    jwt: string | null;
    orderId: string;
    orderStatus: string;
  }
>(
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

      return response.data as SellerOrder;
    } catch (error: unknown) {
      console.log("error", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        return rejectWithValue(
          axiosError.response?.data?.message ??
            "Failed to update order status"
        );
      }

      return rejectWithValue(
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