
import { Route, Routes } from 'react-router'
import SellerTable from '../admin/seller/SellerTable'
import Coupon from '../admin/Coupon/Coupon'
import CouponForm from '../admin/Coupon/CouponForm'
import GridTable from '../admin/HomePage/GridTable'
import ElectronicsTable from '../admin/HomePage/ElectronicsTable'
import ShopByTable from '../admin/HomePage/ShopByTable'
import Deal from '../admin/deal/Deal'

function AdminRoutes() {
    
  return (
  <Routes>
    <Route path="/" element={<SellerTable/>}/>
        <Route path="/coupon" element={<Coupon/>}/>
            <Route path="/add-coupon" element={<CouponForm/>}/>
                <Route path="home-grid" element={<GridTable/>}/>
                    <Route path="/electronics-category" element={<ElectronicsTable/>}/>
    <Route path="/shop-by-category" element={<ShopByTable/>}/>
        <Route path="/deals" element={<Deal/>}/>
  </Routes>
  )
}

export default AdminRoutes
