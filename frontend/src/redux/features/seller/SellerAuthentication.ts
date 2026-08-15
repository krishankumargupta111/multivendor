import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { createSlice } from "@reduxjs/toolkit";
const initialState={
    otpSent:false,
    jwt:null,
    error:null,
    loading:false
}

const API_URL="/sellers"

export const sendLoginOtp = createAsyncThunk<any, any>(
  "/sellers/sendLoginOtp",
  async ({ email} , { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/send/login-otp`, {
        email,
      });


      console.log("otp sent", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);


export const verifyLoginOtp = createAsyncThunk<any, any>(
  "/sellers/verifyLoginOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/verify/login-otp`,

       data
      );
    localStorage.setItem("jwt", response.data.authResponse.jwt);
data.navigate("/seller")

      console.log("verify login otp", response.data);


      console.log(response.data);
console.log(response.data.authResponse);
console.log(response.data.authResponse?.jwt);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);


export const createSeller = createAsyncThunk<any,any>(
  "/auth/createSeller",
  async ( seller , { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}`, 
       seller
      );

      console.log(" create seller response", response.data);

      
      return response.data;
    } catch (error) {
      console.log("error", error);
  console.error(error);
  console.error(error.message);
  console.error(error.stack);
      return rejectWithValue(error);
    }
  },
);



const sellerSlice=createSlice({
    name:"seller",
    initialState,
    reducers:{
        resetSellerAuthState:(state)=>{
            state.otpSent=false
            state.jwt=null,
            state.error=null,
            state.loading=false
        }
    },
    extraReducers:(builder)=>{
            builder.addCase(sendLoginOtp.fulfilled,(state,action)=>{
                state.otpSent=true

            })
                builder.addCase(createSeller.fulfilled,(state,action)=>{
                state.jwt=action.payload.jwt
      
            })
             builder.addCase(verifyLoginOtp.fulfilled,(state,action)=>{
                state.jwt=action.payload.jwt

            })
               
    }
})

export const {resetSellerAuthState}=sellerSlice.actions
export default sellerSlice.reducer




