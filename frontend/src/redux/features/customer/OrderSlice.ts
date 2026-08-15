import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
   addresses: [],
  orders: [],
  loading: false,
  error: "",
  currentOrder: null,
  orderItem: null,
  paymentOrder: null,
};

const API_URL = "/api/order";
export const fetchUserOrderHistory = createAsyncThunk<any, any>(
  "/orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch user order history", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);


export const fetchOrderById = createAsyncThunk<any, any>(
  "/orders/fetchOrderById",
  async ({jwt,orderId}, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch order by id", response.data);

      return response.data;
    } catch (error: any) {
  console.log(error.response?.status);
  console.log(error.response?.data);

  return rejectWithValue(error.response?.data);
}
  },
);



export const createOrder = createAsyncThunk<any, any>(
  "/orders/createOrder",
  async ({ addressId, jwt, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}`,
        {
          addressId, 
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            paymentMethod: paymentGateway,
          },
        }
      );

      console.log("create order", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  }
);



export const fetchOrderItemById = createAsyncThunk<any, any>(
  "/orders/fetchOrderItemById",
  async ({jwt,orderItemId}, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/item/${orderItemId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch order item by id", response.data);

      return response.data;
    } catch (error: any) {
  console.log(error.response?.status);
  console.log(error.response?.data);

  return rejectWithValue(error.response?.data);
}
  },
);




export const createAddress = createAsyncThunk<any, any>(
  "/orders/createAddress",
    async ({ jwt, address }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/addAddress`,
        address,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );


      console.log("create address", response.data);

      return response.data;
    } catch (error: any) {
  console.log(error.response?.status);
  console.log(error.response?.data);

  return rejectWithValue(error.response?.data);
}
  },
);
export const fetchAddresses = createAsyncThunk<any, any>(
  "/orders/fetchAddresses",
     async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });


      console.log("fetch addresses", response.data);

      return response.data;
    } catch (error: any) {
  console.log(error.response?.status);
  console.log(error.response?.data);

  return rejectWithValue(error.response?.data);
}
  },
);


export const paymentSuccess = createAsyncThunk<any, any>(
  "/orders/paymentSuccess",
  async ({jwt,paymentId,paymnetLinkId}, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/payment/${paymentId}` ,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params:{paymnetLinkId}
      });
      console.log("payment success", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);





export const cancelOrder = createAsyncThunk<any, any>(
  "/orders/CancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${orderId}/cancel`,
        {},
        {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
      });
      console.log("cancel order", response.data);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);



const orderSlice=createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUserOrderHistory.pending,(state)=>{
            state.loading=true
        })


         .addCase(fetchUserOrderHistory.fulfilled,(state,action)=>{
            state.loading=false
            state.orders=action.payload
        })
        .addCase(fetchUserOrderHistory.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })


        .addCase(fetchOrderById.pending,(state)=>{
            state.loading=true
           
        })

         .addCase(fetchOrderById.fulfilled,(state,action)=>{
            state.loading=false
            state.currentOrder=action.payload
           
        })

         .addCase(fetchOrderById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
           
        })



         .addCase(createOrder.pending,(state)=>{
            state.loading=true
           
        })

         .addCase(createOrder.fulfilled,(state,action)=>{
            state.loading=false
            state.currentOrder=action.payload
            state.paymentOrder=action.payload
           
        })

         .addCase(createOrder.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
           
        })


         .addCase(paymentSuccess.pending,(state)=>{
            state.loading=true
           
        })

         .addCase(paymentSuccess.fulfilled,(state,action)=>{
            state.loading=false
            state.currentOrder=action.payload
           
        })

         .addCase(paymentSuccess.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
           
        })
         .addCase(cancelOrder.pending,(state)=>{
            state.loading=true
           
        })

      .addCase(cancelOrder.fulfilled, (state, action) => {
    state.loading = false;
    state.currentOrder = action.payload.order;

    state.orders = state.orders.filter(
        order => order._id !== action.payload.order._id
    );
})

         .addCase(cancelOrder.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
           
        })


         .addCase(fetchOrderItemById.pending,(state)=>{
            state.loading=true
           
        })

         .addCase(fetchOrderItemById.fulfilled,(state,action)=>{
            state.loading=false
            state.orderItem=action.payload
           
        })

         .addCase(fetchOrderItemById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
           
        })
 .addCase(createAddress.pending, (state) => {
    state.loading = true;
  })
  .addCase(createAddress.fulfilled, (state, action) => {
    state.loading = false;
    state.addresses.push(action.payload.address);
  })
  .addCase(createAddress.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message || action.error.message;
  })

  .addCase(fetchAddresses.fulfilled, (state, action) => {
    state.addresses = action.payload;
})

 }

})


export default orderSlice.reducer


