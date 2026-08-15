import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { Button, Snackbar } from '@mui/material'
import { useAppSelector } from '../redux/store'

function Auth() {


    const {auth}=useAppSelector(state=>state)
    const [isLogin,setIsLogin]=useState(false)
  

    
  return (
    <div className='flex justify-center h-[90vh] items-center'>
        <div className='max-w-md h-[85vh] rounded-md shadow-lg '>
            <img className='w-full rounded-t-md' src="https://zosh-bazzar.vercel.app/login_banner.png" alt=""/>
        
        <div className='mt-8 px-10 '>
            {isLogin?<LoginForm/>:<SignupForm/>
            
            }
            <div className='flex items-center gap-1 justify-center mt-5'>
                <p>{isLogin?"Do not have an account?":"Already have an account"}</p>
                <Button onClick={()=>setIsLogin(!isLogin)}>{isLogin?"Signup":"Login"}</Button>

            </div>
        </div>
        </div>
      <Snackbar
  open={auth.otpSend}
  autoHideDuration={6000}
 // onClose={handleClose}
  message="otp sent successfully"
 
/>
    </div>
  )
}

export default Auth
