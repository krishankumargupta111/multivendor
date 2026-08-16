import  { useState } from 'react'
import SellerLogin from './SellerLogin'
import SellerAccountForm from './SellerAccountForm'
import { Button } from '@mui/material'

function BecomeSeller() {
    const [isLogin,setIsLogin]=useState(false)
    
  return (
    <div className='grid md:gap-10 grid-cols-3 min-h-screen'>
        <section className='lg:col-span-1 md:col-span-2 col-span-3 shadow-lg 
        rounded-b-md p-5 '>
{isLogin?<SellerLogin/>:<SellerAccountForm/>}

<div className='top-10 space-y-2'>
    <h1 className='text-center tex-sm font-medium '>Have Account

    </h1>
    <Button onClick={()=>setIsLogin(!isLogin)} 
    sx={{py:"12px"}}
     fullWidth variant='outlined'>
        {isLogin?"Register":"Login"}
    </Button>

</div>
        </section>


        <section className='hidden md:flex md:col-span-1 lg:col-span-2 '>
            <div className='flex  '>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/039/595/774/small/ai-generated-fashion-store-displays-a-variety-of-colorful-clothing-options-for-men-generated-by-ai-photo.jpg" alt=""/>
            </div>
        </section>
     
    </div>
  )
}

export default BecomeSeller
