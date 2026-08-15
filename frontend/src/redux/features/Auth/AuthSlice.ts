import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { resetUserState } from "../customer/UserSlice";
import { resetSellerAuthState } from "../seller/SellerAuthentication";

const API_URL = "/auth";


const initialState={
    jwt:null,role:null,
loading:false,
error:null,
otpSend:false}
export const sendLoginSignupOtp = createAsyncThunk<any, { email: string }>(
  "/auth/sendLoginSignupOtp",
  async ({ email} , { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/sent/login-signup-otp`, {
        email,
      });

      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);


export const signup = createAsyncThunk<any,any>(
  "/auth/signup",
  async ( signupRequest , { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/signup`, 
        signupRequest
      );

      console.log("response", response.data);

      localStorage.setItem("jwt",response.data.jwt)
      
      signupRequest.navigate("/")
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

export const signin = createAsyncThunk<any,any>(
  "/auth/signin",
  async ( signinRequest , { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/signin`,
        signinRequest
      );

      console.log("response", response.data);

      localStorage.setItem("jwt",response.data.jwt)
if(response.data.role==='ROLE_ADMIN'){
  signinRequest.navigate("/admin")
}
else{
  signinRequest.navigate("/")
}
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);


const authSlice=createSlice({
name:"auth",
initialState,
reducers:{
    logout:(state)=>{
        state.jwt=null
        state.role=null,
        state.otpSend=false
    },
     resetAuthState: (state) => {
      state.otpSend = false;
      state.error = null;
      state.loading = false;
    },
},


extraReducers:(builder)=>{
    builder.addCase(sendLoginSignupOtp.fulfilled,(state,action)=>{
        state.otpSend=true
    })
        builder.addCase(signup.fulfilled,(state,action)=>{
        state.jwt=action.payload.jwt
        state.role=action.payload.role
    })

        builder.addCase(signin.fulfilled,(state,action)=>{
        state.jwt=action.payload.jwt
        state.role=action.payload.role
    })
}
})



export const { resetAuthState } = authSlice.actions
export const {logout}=authSlice.actions

export const performLogout=()=>async(dispatch:any)=>{
  dispatch(logout())

  dispatch(resetSellerAuthState())
  dispatch(resetUserState())
  localStorage.removeItem("jwt")
}

export default authSlice.reducer