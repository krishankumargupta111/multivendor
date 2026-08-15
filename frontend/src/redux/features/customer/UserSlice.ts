import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
const API_URL='api/users'
export const fetchUserProfile = createAsyncThunk<any,any>(
  "/users/fetchUserProfile",
  async ( jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/profile`, 
        {headers:{
          Authorization:`Bearer ${jwt}`
        }}
        
     
      );

      console.log("response", response.data);

     
     
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);


const initialState={
    user:null,
    loading:null,
    error:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{

      resetUserState:(state)=>{
        state.user=null,
        state.loading=false,
        state.error=null
      }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUserProfile.pending,(state)=>{
            state.loading=true
            state.error=null
        })
         builder.addCase(fetchUserProfile.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
         builder.addCase(fetchUserProfile.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})
export const{resetUserState}=userSlice.actions
export default userSlice.reducer