import {  ThemeProvider } from "@mui/material"
import { customeTheme } from "./theme/customeTheme"
import { Route,Routes } from "react-router"
import SellerDashboard from "./sellers/sellerDashboard/SellerDashboard"
import BecomeSeller from "./auth/Become-seller/BecomeSeller"
import CustomerRoutes from "./routes/CustomerRoutes"
import Auth from "./auth/Auth"
import Dashboard from "./admin/Dashboard/Dashboard"
import { useAppDispatch, useAppSelector } from "./redux/store"
import { useEffect } from "react"
import { fetchUserProfile } from "./redux/features/customer/UserSlice"
import { fetchSellerProfile } from "./redux/features/seller/SellerSlice"
import { createHomeCategories } from "./redux/features/customer/HomeCategorySlice"
import { homeCategories } from "./data/home_categories"



function App() {
  const dispatch=useAppDispatch()

  const {auth}=useAppSelector(store=>store)

  useEffect(()=>{

    const jwt=localStorage.getItem("jwt")
if(jwt ||auth.jwt){
  dispatch(fetchUserProfile(jwt))
  dispatch(fetchSellerProfile(jwt))
}
  },[auth.jwt])



  useEffect(()=>{
    dispatch(createHomeCategories(homeCategories))


    
  },[dispatch])
  
  return (


    
      <ThemeProvider theme={customeTheme}>
     


<Routes>
    <Route path="/become-seller" element={<BecomeSeller/>}/>
  <Route path="/seller/*" element={<SellerDashboard/>}/>
  <Route path="/admin/*" element={<Dashboard/>}/>
    <Route path="/login" element={<Auth/>}/>
    <Route path="/*" element={<CustomerRoutes/>}/>
</Routes>














      </ThemeProvider>
    
  )
}

export default App
