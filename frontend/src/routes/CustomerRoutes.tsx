
import { Route,Routes } from "react-router"
import Navbar from "../customer/Navbar/Navbar"
import Home from "../customer/pages/Home/Home"
import Products from "../customer/pages/Product/Products"
import ProductDetails from "../customer/pages/Product/productdetails/ProductDetails"
import Cart from "../customer/pages/cart/Cart"
import Checkout from "../customer/pages/checkout/Checkout"
import Profile from "../customer/pages/order/Profile"
import Footer from "../customer/footer/Footer"
import CheckoutPage from "../customer/pages/checkout/CheckoutPage"
import OrderSuccess from "../customer/pages/checkout/OrderSuccess"
function CustomerRoutes() {
  return (
    <div>
           <Navbar/>
           <Routes>
  <Route path="/" element={<Home/>}/>
   <Route path="/products/:categoryId" element={<Products/>}/>
    <Route path="/product-detail/:categoryId/:name/:productId" 
    element={<ProductDetails/>}/>
     <Route path="/cart" element={<Cart/>}/>
     <Route path="/checkout/address" element={<Checkout/>}/>
      <Route path="/account/*" element={<Profile/>}/>
<Route path="/checkout" element={<CheckoutPage />} />
<Route path="/order-success" element={<OrderSuccess />} />
</Routes>
    <Footer/>
    </div>
  )
}

export default CustomerRoutes
