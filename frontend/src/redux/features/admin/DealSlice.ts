import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  deals: [],
  loading: true,
  error: "",
};
export const createDeal = createAsyncThunk<any, any>(
  "/deal/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
       console.log("Deal Sent:", deal);
      const response = await api.post(`/admin/deals`, deal, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      console.log("create deal", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

export const getAllDeals = createAsyncThunk<any, any>(
  "/deal/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/deals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      console.log("get all deals", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

export const deleteDeal = createAsyncThunk<any, any>(
  "/deal/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/deals/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      console.log("delete deal", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

export const updateDeal = createAsyncThunk<any, any>(
  "/deal/updateDeal",
  async ({ id, deal }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/deals/${id}`, deal, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      console.log("update deal", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDeal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.deals.push(action.payload);
    });
    builder.addCase(createDeal.rejected, (state, action) => {
      state.loading = false;
      // state.error = action.payload
    });

    builder.addCase(getAllDeals.pending, (state) => {
      state.loading = true;
     
    });
    builder.addCase(getAllDeals.fulfilled, (state, action) => {
      state.loading = false;
      state.deals = action.payload;
    });
    builder.addCase(getAllDeals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    });



    
    builder.addCase(deleteDeal.pending, (state) => {
      state.loading = true;
     
    });
    builder.addCase(deleteDeal.fulfilled, (state, action) => {
      state.loading = false;
     state.deals=state.deals.filter((deal:any)=>deal._id!==action.meta.arg)
    });
    builder.addCase(deleteDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    });



    
    builder.addCase(updateDeal.pending, (state) => {
      state.loading = true;
     
    });
    builder.addCase(updateDeal.fulfilled, (state, action) => {
      state.loading = false;
      const index=state.deals.findIndex((deal:any)=>deal._id===action.payload._id)
      state.deals[index]=action.payload
    });
    builder.addCase(updateDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    });
  },
});


export default dealSlice.reducer
