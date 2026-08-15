import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../../config/api"
const API_URL='products'
const initialState={
    product:null,
    products:[],
    loading:false,
    error:"",
    SearchProduct:[],
    totalElements:0,
    totalPages:0
}


export const fetchProductById=createAsyncThunk<any,any>(
    "/products/fetchProductById",
async(productId,{rejectWithValue})=>{
    try{
const response=await api.get(`${API_URL}/${productId}`)

console.log("find product bu id",response.data
)
return response.data
    }catch(error){
console.log("error",error)
return rejectWithValue(error)
    }
}
)


export const searchProduct=createAsyncThunk<any,any>(
    "/products/searchProduct",
async(query,{rejectWithValue})=>{
    try{
const response=await api.get(`${API_URL}/search`,{
    params:{
        q:query
    }
})

console.log("search products",response.data
)
return response.data
    }catch(error){
console.log("error",error)
return rejectWithValue(error)
    }
}
)


export const getAllProducts=createAsyncThunk<any,any>(
    "/products/getAllProducts",
async(params,{rejectWithValue})=>{
    try{
        console.log(params);
const response=await api.get(API_URL,{
    params:{
        ...params,
        pageNumber:params.pageNumber||0
        
    }})

console.log("get all products",response.data
)
return response.data
    }catch(error){
console.log("error",error)
return rejectWithValue(error)
    }
}
)


const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.loading=true
            state.error=""
        })
         builder.addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading=false
            state.products=action.payload.content
            state.totalElements=action.payload.totalElements
            state.totalPages=action.payload.totalPages
        })
         builder.addCase(getAllProducts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })

         .addCase(fetchProductById.pending,(state)=>{
            state.loading=true
            state.error=""
        })
         .addCase(fetchProductById.fulfilled,(state,action)=>{
            state.loading=false
            state.product=action.payload
        })
         .addCase(fetchProductById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
 

         .addCase(searchProduct.pending,(state)=>{
            state.loading=true
            state.error=""
        })
         .addCase(searchProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.SearchProduct=action.payload
        })
         .addCase(searchProduct.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
       

        
      
    }
})


export default productSlice.reducer