import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL="/home"

export const updateHomeCategory =createAsyncThunk<any, any>(
  "/homeCategory/updateHomeCategory",
  async ({id,data}, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/home-category/${id}`,data);

      console.log("update home category", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

export const fetchHomeCategory =createAsyncThunk<any, any>(
  "/homeCategory/fetchHomeCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/home-category`);

      console.log("fetch home category", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);



const initialState={
    categories:[],
    loading:false,
    error:""
}



const HomeCategorySlice=createSlice({
    name:'homeCategory',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
         builder.addCase(fetchHomeCategory.pending, (state) => {
              state.loading = true;
              state.error=""
            });
            builder.addCase(fetchHomeCategory.fulfilled, (state, action) => {
              state.loading = false
              state.categories= action.payload
            });
            builder.addCase(fetchHomeCategory.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
            });
        

             builder.addCase(updateHomeCategory.pending, (state) => {
                  state.loading = true;
                  state.error=""
                });
                builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
                  state.loading = false
                  const index=state.categories.findIndex(
                    (category:any)=>category._id===action.payload._id
                  )
                  state.categories[index]=action.payload
                });
                builder.addCase(updateHomeCategory.rejected, (state, action) => {
                  state.loading = false;
                  state.error = action.error.message;
                });
            
    }
})

export default HomeCategorySlice.reducer