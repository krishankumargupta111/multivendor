import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface Order {
  _id: string;
  totalSellingPrice?: number;
}

interface Customer {
  _id: string;
  fullName?: string;
}

interface Transaction {
  _id: string;
  date?: string;
  customer?: Customer;
  order?: Order;
}

interface TransactionState {
  transaction: Transaction[];
  loading: boolean;
  error: string;
}

const initialState: TransactionState = {
  transaction: [],
  loading: false,
  error: "",
};

export const fetchTransactionBySeller = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>(
  "/transaction/fetchTransactionBySeller",

  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/transactions/seller`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(
        "fetch transaction by seller",
        response.data
      );

      return response.data;
    } catch (error: any) {
      console.log("error", error);

      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch transactions"
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchTransactionBySeller.pending,
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )

      .addCase(
        fetchTransactionBySeller.fulfilled,
        (state, action) => {
          state.loading = false;
          state.transaction = action.payload;
        }
      )

      .addCase(
        fetchTransactionBySeller.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            action.error.message ||
            "Something went wrong";
        }
      );
  },
});

export default transactionSlice.reducer;