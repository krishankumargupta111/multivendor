import { AccountBalanceWallet, AccountBox, Add, Category, Dashboard, ElectricBolt, Home, IntegrationInstructions, Inventory, LocalOffer, Logout, Receipt, ShoppingBag } from '@mui/icons-material'
import { Divider, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAppSelector } from '../../redux/store'


const menu=[
    {
        name:'Dashboard',
        path:'/admin',
        icon:<Dashboard className='text-primary-color'/>,
        activeIcon:<Dashboard className='text-white'/>
    },
     {
        name:'Coupons',
        path:'/admin/coupon',
        icon:<IntegrationInstructions className='text-primary-color'/>,
        activeIcon:<IntegrationInstructions className='text-white'/>
    },
     {
        name:'Add New Coupon',
        path:'/admin/add-coupon',
        icon:<Add className='text-primary-color'/>,
        activeIcon:<Add className='text-white'/>
    }, {
        name:'Home Page',
        path:'/admin/home-grid',
        icon:<Home className='qtext-primary-color'/>,
        activeIcon:<Home className='text-white'/>
    },
     {
        name:'Electronics Category',
        path:'/admin/electronics-category',
        icon:<ElectricBolt className='text-primary-color'/>,
        activeIcon:<ElectricBolt className='text-white'/>
    }, {
        name:'Shop By Category',
        path:'/admin/shop-by-category',
        icon:<Category className='text-primary-color'/>,
        activeIcon:<Category className='text-white'/>
    },
    {
        name:'Deals',
        path:'/admin/deals',
        icon:<LocalOffer className='text-primary-color'/>,
        activeIcon:<LocalOffer className='text-white'/>
    },
]
    const menu2=[
  {
        name:'Logout',
        path:'/',
        icon:<Logout className='text-primary-color'/>,
        activeIcon:<Logout className='text-white'/>
    }
]

function AdminDrawerList({toggleDrawer}) {


    const user=useAppSelector(store=>store.user)
    const location=useLocation()
    const navigate=useNavigate()

    const handleLogout=()=>{
console.log("logout")
    }

    const handleClick=(item:any)=>{
        if(item.name==="Logout"){
            handleLogout()
        }
        navigate(item.path)
      //  if(toggleDrawer)
        //    toggleDrawer(false)
    }
  return (
    <div className='h-full'>
        <div className='flex flex-col justify-between h-full w-[300px]
        border-r py-5 border-gray-300 '>
            <div className='space-y-2'>
             {
                menu.map((item,index)=>
                   <div onClick={()=>handleClick(item)}
                    key={item.path} className='pr-9 cursor-pointer'>
                    <p className={`${location.pathname===item.path?
                        "bg-[teal] text-white":""
                    } flex
                        items-center px-5 py-3 rounded-r-full`}>
                        <ListItemIcon>
                           {
                            location.pathname===item.path?item.activeIcon:item.icon
                           }
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                    </p>
                </div>

                
                )

             }
            </div>

<div className='space-y-2'>
            <Divider/>

             {
                menu2.map((item,index)=>
                   <div onClick={()=>handleClick(item)}
                    key={item.path} className='pr-9 cursor-pointer'>
                    <p className={`${location.pathname===item.path?
                        "bg-[teal] text-white":""
                    } flex
                        items-center px-5 py-3 rounded-r-full`}>
                        <ListItemIcon>
                           {
                            location.pathname===item.path?item.activeIcon:item.icon
                           }
                        </ListItemIcon>
                        <ListItemText primary={item.name}/>
                        
       
               {user?.user?.fullName}
            
                    </p>
                </div>
                )

             }
            </div>
        </div>
      
    </div>
  )
}

export default AdminDrawerList

