import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { fetchUserOrderHistory } from '../../../redux/features/customer/OrderSlice'


function Order() {
 const navigate=useNavigate()
 const dispatch=useAppDispatch()

 const order=useAppSelector(store=>store.order)


 useEffect(()=>{
  dispatch(fetchUserOrderHistory(localStorage.getItem("jwt")))
 },[])
  return (
    <div className='text-sm min-h-screen'>
        <div className='pb-5'>
            <h1 className='font-semibold'>All Orders</h1>
            <p>from anytime</p>
        </div>
        <div className='space-y-2'>
          {
           order.orders.filter(order => order.orderStatus !== "CANCELLED")
           .map((order,index)=>order?.orderItems
           .map((orderItem,index)=><OrderCard orderItem={orderItem} 
           order={order}
           key={orderItem._id}  />))
          }
          
        </div>
      
    </div>
  )
}

export default Order
