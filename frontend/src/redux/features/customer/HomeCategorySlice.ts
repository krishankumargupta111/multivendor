import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { act } from "react";


export const createHomeCategories= createAsyncThunk<any, any>(
  "/home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post(`/home/categories`,homeCategories);
      console.log("home categories", response.data);

      return response.data;
    } catch (error: any) {
  console.log("Error Response:", error.response);
  console.log("Error Data:", error.response?.data);
return rejectWithValue(
    error.response?.data?.message || "Something went wrong"
  );
}
  },
);


const HomeCategorySlice=createSlice({
    name:'homeCategories',
    initialState:{
        homeCategories:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
         builder.addCase(createHomeCategories.pending,(state)=>{
                    state.loading=true
                    state.error=null
                })
        
        
                 .addCase(createHomeCategories.fulfilled,(state,action)=>{
                    state.loading=false
                    state.homeCategories=action.payload
                })
                .addCase(createHomeCategories.rejected,(state,action)=>{
                    state.loading=false
                    state.error=action.payload
                })
    }
})


export default HomeCategorySlice.reducer

