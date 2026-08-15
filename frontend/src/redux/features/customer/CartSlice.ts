import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";



const initialState = {
  cart: null,
  loading: false,
  error: "",
};

const API_URL = "/api/cart";

export const fetchCart = createAsyncThunk<any, any>(
  "/cart/fetchCart",
  async (jwt, { rejectWithValue }) => {
    try {

      console.log("JWT:", jwt);
      const response = await api.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch cart", response.data);
      
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      console.log(error.response?.status);
      console.log(error.response?.data);
      
      return rejectWithValue(error.response?.data);
    }
  },
);

export const addItemToCart = createAsyncThunk<any, any>(

  "/cart/addItemToCart",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/add`, request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });


        await dispatch(fetchCart(jwt));
      console.log("add item to cart", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

export const deleteCartItem = createAsyncThunk<any, any>(
  "/cart/deleteCartItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${API_URL}/item/${cartItemId}`,

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("delete item from cart", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

export const updateCartItem = createAsyncThunk<any, any>(
  "/cart/updateCartItem",
  async ({ jwt, cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/item/${cartItemId}`,
       {
        quantity
       },

        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      console.log("update item to cart", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      state.loading = false;
      if (state.cart) {
        state.cart.cartItems.push(action.payload);
      }
    });

    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      state.loading = false;
      if (state.cart) {
        const index = state.cart.cartItems.findIndex(
          (item: any) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.cart.cartItems[index] = action.payload;
        }
      }
    });

    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.loading = false;
      if (state.cart) {
        state.cart.cartItems = state.cart.cartItems.filter(
          (item: any) => item._id !== action.meta.arg.cartItemId,
        );
      }
    });

    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default cartSlice.reducer;
