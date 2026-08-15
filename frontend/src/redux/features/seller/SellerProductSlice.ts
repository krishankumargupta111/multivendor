import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL="/api/sellers/products"


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
  },
);


export const createProduct = createAsyncThunk<any, any>(
  "/sellerProduct/createProduct",
  async ({jwt,request}, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}`,request ,{

        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("create seller product", response.data);
      return response.data;
    } catch (error:any) {
      const errorMessage=error.response?.data?.message ||'failed'
      console.log("error", errorMessage,error);
      return rejectWithValue(errorMessage);
    }
  },
);


export const updateProduct = createAsyncThunk<any, any>(
  "/sellerProduct/updateProduct",
  async ({jwt,productId,product}, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${productId}`,product,{

        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("update seller product", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);


const initialState={
    products:[],
    loading:false,
    error:""
}

const sellerProductSlice=createSlice({
    name:"sellerProduct",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
          builder.addCase(fetchSellerProduct.pending, (state) => {
              state.loading = true;
              state.error=""
            });
            builder.addCase(fetchSellerProduct.fulfilled, (state, action) => {
              state.loading = false;
              state.products=action.payload
              
            });
            builder.addCase(fetchSellerProduct.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            });


              builder.addCase(createProduct.pending, (state) => {
                  state.loading = true;
                  state.error=""
                });
                builder.addCase(createProduct.fulfilled, (state, action) => {
                  state.loading = false;
                  state.products.push(action.payload)
                });
                builder.addCase(createProduct.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.error.message;
                });




              builder.addCase(updateProduct.pending, (state) => {
                  state.loading = true;
                  state.error=""
                });
                builder.addCase(updateProduct.fulfilled, (state, action) => {
                  state.loading = false;
                 const index=state.products.
                 findIndex((product:any)=>product._id===action.payload)
                 state.products[index]=action.payload
                });
                builder.addCase(updateProduct.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.error.message;
                });


                
            }
        })
        export default sellerProductSlice.reducer