
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface PaymentPayload {
  paymentId: string;
  paymentLinkId: string;
}

export const sellerPayment = createAsyncThunk(
  "seller/sellerPayment",
  async ({ paymentId, paymentLinkId }: PaymentPayload, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      
      const response = await api.get(`/api/payment/${paymentId}?paymentLinkId=${paymentLinkId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
console.log("seller Payment",response.data)
      return response.data;
    } catch (error: any) {

      console.error("Backend payment API error:", error);
   console.error("Message:", error.message);
    console.error("Stack:", error.stack);
      return rejectWithValue(error.response?.data?.message || "Payment Failed");
    }
  }
);

interface PaymentState {
  paymentDetails: any;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  paymentDetails: null,
  loading: false,
  error: null,
};

const sellerPaymentSlice = createSlice({
  name: "sellerPayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sellerPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentDetails = action.payload;
      })
      .addCase(sellerPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerPaymentSlice.reducer;