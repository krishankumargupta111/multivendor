import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile:null,
  report: null,
  profileUpdated: false,
};

const API_URL="/sellers";

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
  },
);

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
  },
);

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
  },
);

export const fetchSellerById = createAsyncThunk<any, number>(
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
  },
);

export const updateSellerAccountStatus = createAsyncThunk<any, any>(
  "/sellers/fetchSellerAccountStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.patch(`/admin/seller/${id}/status/${status}`);

      console.log("update seller status", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellerProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.profileUpdated = false;
    });
    builder.addCase(fetchSellerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchSellerProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchSellers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSellers.fulfilled, (state, action) => {
      state.loading = false;
      state.sellers = action.payload;
    });
    builder.addCase(fetchSellers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchSellerById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSellerById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedSeller = action.payload;
    });
    builder.addCase(fetchSellerById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateSellerAccountStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.sellers.findIndex(
        (seller) => seller._id === action.payload._id,
      );
      if (index !== -1) {
        state.sellers[index] = action.payload;
      }
    });
    builder.addCase(updateSellerAccountStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchSellerReport.pending, (state) => {
      state.loading = true;
      state.error=null
    });
    builder.addCase(fetchSellerReport.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload;
    });
    builder.addCase(fetchSellerReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});



export default sellerSlice.reducer
