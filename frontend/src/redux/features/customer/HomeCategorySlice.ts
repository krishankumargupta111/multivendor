import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface HomeCategory {
  _id?: string;
  name?: string;
  image?: string;
  categoryId?: string;
  [key: string]: any;
}

interface HomeCategories {
  grid: HomeCategory[];
  electricCategories: HomeCategory[];
  shopByCategory: HomeCategory[];
}

interface HomeCategoryState {
  homeCategories: HomeCategories;
  loading: boolean;
  error: string | null;
}

export const createHomeCategories = createAsyncThunk<any, any>(
  "/home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/home/categories`,
        homeCategories
      );

      console.log("home categories", response.data);

      return response.data;
    } catch (error: any) {
      console.log("Error Response:", error.response);
      console.log("Error Data:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const initialState: HomeCategoryState = {
  homeCategories: {
    grid: [],
    electricCategories: [],
    shopByCategory: [],
  },
  loading: false,
  error: null,
};

const HomeCategorySlice = createSlice({
  name: "homeCategories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })

      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Something went wrong";
      });
  },
});

export default HomeCategorySlice.reducer;