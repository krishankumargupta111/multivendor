import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "/api/sellers/products";

// ================= TYPES =================

interface SellerProduct {
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

  [key: string]: any;
}

interface SellerProductState {
  products: SellerProduct[];
  loading: boolean;
  error: string;
}

// ================= FETCH SELLER PRODUCTS =================

export const fetchSellerProduct = createAsyncThunk<any, any>(
  "/sellerProduct/fetchSellerProduct",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("fetch seller product", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= CREATE PRODUCT =================

export const createProduct = createAsyncThunk<any, any>(
  "/sellerProduct/createProduct",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("create seller product", response.data);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "failed";

      console.log(
        "error",
        errorMessage,
        error
      );

      return rejectWithValue(errorMessage);
    }
  }
);

// ================= UPDATE PRODUCT =================

export const updateProduct = createAsyncThunk<any, any>(
  "/sellerProduct/updateProduct",
  async (
    { jwt, productId, product },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `${API_URL}/${productId}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(
        "update seller product",
        response.data
      );

      return response.data;
    } catch (error) {
      console.log("error", error);

      return rejectWithValue(error);
    }
  }
);

// ================= INITIAL STATE =================

const initialState: SellerProductState = {
  products: [],
  loading: false,
  error: "",
};

// ================= SLICE =================

const sellerProductSlice = createSlice({
  name: "sellerProduct",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // ================= FETCH PRODUCTS =================

    builder
      .addCase(
        fetchSellerProduct.pending,
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )

      .addCase(
        fetchSellerProduct.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products = action.payload;
        }
      )

      .addCase(
        fetchSellerProduct.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ?? "";
        }
      );

    // ================= CREATE PRODUCT =================

    builder
      .addCase(
        createProduct.pending,
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )

      .addCase(
        createProduct.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products.push(
            action.payload
          );
        }
      )

      .addCase(
        createProduct.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            (action.payload as string) ??
            action.error.message ??
            "";
        }
      );

    // ================= UPDATE PRODUCT =================

    builder
      .addCase(
        updateProduct.pending,
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )

      .addCase(
        updateProduct.fulfilled,
        (state, action) => {
          state.loading = false;

          const index =
            state.products.findIndex(
              (product) =>
                product._id ===
                action.payload._id
            );

          if (index !== -1) {
            state.products[index] =
              action.payload;
          }
        }
      )

      .addCase(
        updateProduct.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.error.message ?? "";
        }
      );
  },
});

export default sellerProductSlice.reducer;