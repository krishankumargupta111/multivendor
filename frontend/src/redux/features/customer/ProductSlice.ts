import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "products";

// ================= TYPES =================

interface Product {
  _id: string;
  title?: string;
  description?: string;
  price?: number;
  mrpPrice?: number;
  sellingPrice?: number;
  quantity?: number;
  stock?: number;
  imageUrl?: string;
  images?: string[];
  category?: any;
  seller?: any;

  // Allows your existing backend fields
  [key: string]: any;
}

interface ProductState {
  product: Product | null;
  products: Product[];
  loading: boolean;
  error: string;
  SearchProduct: Product[];
  totalElements: number;
  totalPages: number;
}

// ================= INITIAL STATE =================

const initialState: ProductState = {
  product: null,
  products: [],
  loading: false,
  error: "",
  SearchProduct: [],
  totalElements: 0,
  totalPages: 0,
};

// ================= FETCH PRODUCT BY ID =================

export const fetchProductById = createAsyncThunk<any, any>(
  "/products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);

      console.log("find product by id", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

// ================= SEARCH PRODUCT =================

export const searchProduct = createAsyncThunk<any, any>(
  "/products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: {
          q: query,
        },
      });

      console.log("search products", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

// ================= GET ALL PRODUCTS =================

export const getAllProducts = createAsyncThunk<any, any>(
  "/products/getAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params);

      const response = await api.get(API_URL, {
        params: {
          ...params,
          pageNumber: params.pageNumber || 0,
        },
      });

      console.log("get all products", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);

// ================= SLICE =================

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // ================= GET ALL PRODUCTS =================

    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      });

    // ================= FETCH PRODUCT BY ID =================

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      });

    // ================= SEARCH PRODUCT =================

    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.SearchProduct = action.payload;
      })

      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      });
  },
});

export default productSlice.reducer;