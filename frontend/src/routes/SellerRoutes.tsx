
import { Route, Routes } from 'react-router'
import HomePage from '../sellers/home/HomePage'
import Products from '../sellers/products/Products'
import Order from '../sellers/order/Order'
import AddProducts from '../sellers/products/AddProducts'
import Account from '../sellers/account/Account'
import Payment from '../sellers/payment/Payment'
import Transaction from '../sellers/transaction/Transaction'

function SellerRoutes() {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/add-product' element={<AddProducts/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/account' element={<Account/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
        
        
        
    </Routes>
  )
}

export default SellerRoutes
