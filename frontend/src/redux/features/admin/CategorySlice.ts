import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

interface Category {
  _id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: "",
};

export const getAllCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/categories");

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default categorySlice.reducer;