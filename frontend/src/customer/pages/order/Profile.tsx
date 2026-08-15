import { Divider } from '@mui/material'
import React from 'react'
import Order from './Order'
import OrderDetail from './OrderDetail'
import { Route, Routes, useNavigate } from 'react-router'
import UserDetails from '../account/UserDetails'
import { performLogout } from '../../../redux/features/Auth/AuthSlice'
import { useAppDispatch } from '../../../redux/store'


const menu=[
    {name:"orders",path:"/account/orders"},
    {name:"profile",path:"/account"},
    {name:"Logout",path:"/"}

    
]

function Profile() {
const dispatch=useAppDispatch()
  const navigate=useNavigate()


  const handleClick=(item:any)=>{

    if(item.name==="Logout") handleLogOut()
    navigate(item.path)
  }

  const handleLogOut=()=>{
   dispatch(performLogout())
  }

  return (
    <div className='px-5 lg:px-52 min-h-screen mt-10'>
      <div>
        <h1 className='text-xl font-bold pb-5 '>
            Bazaar
        </h1>
      </div>
      <Divider/>
      <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>
        <div className='col-span-1 lg:border-r border-gray-200 lg:pr-5 py-5 h-full flex flex-row
        flex-wrap lg:flex-col gap-3'>

            {menu.map((item)=><div
            onClick={()=>handleClick(item)}
            className='px-5 py-3 rounded-md hover:bg-teal-500 hover:text-white
            cursor-pointer'
            key={item.path}>
                <p>{item.name}</p>
            </div>)}
        </div>
        <div className='lg:col-span-2 lg:pl-5 py-5'>
          
          
          <Routes>
            <Route path='/' element={<UserDetails/>}/>
            <Route path='/orders' element={<Order/>}/>
              <Route path='/orders/:orderId/item/:orderItemId' element={<OrderDetail/>}/>
          </Routes>
          
        


        

        </div>
         </div>
    </div>
  )
}

export default Profile
