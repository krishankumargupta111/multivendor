import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// ================= TYPES =================

interface Deal {
  _id: string;
  title?: string;
  description?: string;
  discount?: number;
  image?: string;
  startDate?: string;
  endDate?: string;

  [key: string]: any;
}

interface DealState {
  deals: Deal[];
  loading: boolean;
  error: string;
}

// ================= INITIAL STATE =================

const initialState: DealState = {
  deals: [],
  loading: false,
  error: "",
};

// ================= CREATE DEAL =================

export const createDeal = createAsyncThunk<any, any>(
  "/deal/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
      console.log("Deal Sent:", deal);

      const response = await api.post(
        `/admin/deals`,
        deal,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("create deal", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= GET ALL DEALS =================

export const getAllDeals = createAsyncThunk<any, any>(
  "/deal/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/admin/deals`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("get all deals", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= DELETE DEAL =================

export const deleteDeal = createAsyncThunk<any, any>(
  "/deal/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/admin/deals/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("delete deal", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= UPDATE DEAL =================

export const updateDeal = createAsyncThunk<any, any>(
  "/deal/updateDeal",
  async ({ id, deal }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/deals/${id}`,
        deal,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("update deal", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= SLICE =================

const dealSlice = createSlice({
  name: "deal",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // ================= CREATE =================

    builder
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
      })

      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;

        state.deals.push(action.payload);
      })

      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as any)?.message ??
          action.error.message ??
          "";
      });

    // ================= GET ALL =================

    builder
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.loading = false;

        state.deals = action.payload;
      })

      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as any)?.message ??
          action.error.message ??
          "";
      });

    // ================= DELETE =================

    builder
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;

        state.deals = state.deals.filter(
          (deal) => deal._id !== action.meta.arg
        );
      })

      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as any)?.message ??
          action.error.message ??
          "";
      });

    // ================= UPDATE =================

    builder
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.deals.findIndex(
          (deal) => deal._id === action.payload._id
        );

        if (index !== -1) {
          state.deals[index] = action.payload;
        }
      })

      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as any)?.message ??
          action.error.message ??
          "";
      });
  },
});

export default dealSlice.reducer;