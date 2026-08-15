import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState={
    transaction:[],
    loading:false,
    error:""
}

export const fetchTransactionBySeller = createAsyncThunk<any, any>(
  "/transactoin/fetchTransactionBySeller",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/transactions/seller`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("fetch trasaction by seller", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);


const transactionSlice=createSlice({
    name:'transaction',
    initialState,
    reducers:{},

    extraReducers:(builder)=>{
 builder.addCase(fetchTransactionBySeller.pending, (state) => {
      state.loading = true;
      state.error = "";
      
    });
    builder.addCase(fetchTransactionBySeller.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    });
    builder.addCase(fetchTransactionBySeller.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    }
})

export default transactionSlice.reducer