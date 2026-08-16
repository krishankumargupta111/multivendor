import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// ================= TYPES =================

interface Seller {
  _id: string;
  sellerName?: string;
  email?: string;
  mobile?: string;
  role?: string;
  accountStatus?: string;
  businessDetail?: any;
  bankDetail?: any;
  pickupAddress?: any;

  [key: string]: any;
}

interface SellerState {
  sellers: Seller[];
  selectedSeller: Seller | null;
  loading: boolean;
  error: string | null;
  profile: Seller | null;
  report: any | null;
  profileUpdated: boolean;
}

// ================= INITIAL STATE =================

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile: null,
  report: null,
  profileUpdated: false,
};

const API_URL = "/sellers";

// ================= FETCH SELLER PROFILE =================

export const fetchSellerProfile = createAsyncThunk<any, any>(
  "/sellers/fetchSellerProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("fetch seller profile", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= FETCH SELLERS =================

export const fetchSellers = createAsyncThunk<any, string>(
  "/sellers/fetchSellers",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        params: {
          status,
        },
      });

      console.log("fetch sellers", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= FETCH SELLER REPORT =================

export const fetchSellerReport = createAsyncThunk<any, any>(
  "/sellers/fetchSellerReport",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/report`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("fetch seller report", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= FETCH SELLER BY ID =================

export const fetchSellerById = createAsyncThunk<any, string>(
  "/sellers/fetchSellerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);

      console.log("fetch seller by id", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= UPDATE SELLER STATUS =================

export const updateSellerAccountStatus = createAsyncThunk<
  any,
  { id: string; status: string }
>(
  "/sellers/fetchSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/admin/seller/${id}/status/${status}`
      );

      console.log("update seller status", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= SLICE =================

const sellerSlice = createSlice({
  name: "sellers",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // ================= SELLER PROFILE =================

    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })

      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })

      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });

    // ================= FETCH SELLERS =================

    builder
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })

      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });

    // ================= FETCH SELLER BY ID =================

    builder
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSeller = action.payload;
      })

      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });

    // ================= UPDATE SELLER STATUS =================

    builder
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.sellers.findIndex(
          (seller) => seller._id === action.payload._id
        );

        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
      })

      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });

    // ================= SELLER REPORT =================

    builder
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })

      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default sellerSlice.reducer;