import { useFormik } from 'formik'
import  { useState } from 'react'
import { Button, Step, StepLabel, Stepper } from '@mui/material'
import BecomeSellerStep1 from './BecomeSellerStep1'
import BecomeSellerStep2 from './BecomeSellerStep2'
import BecomeSellerStep3 from './BecomeSellerStep3'
import BecomeSellerStep4 from './BecomeSellerStep4'
import { useAppDispatch } from '../../redux/store'
import { createSeller } from '../../redux/features/seller/SellerAuthentication'

const steps=['Tax Details & Mobile','Pickup Address','Bank Details','Business Details']

function SellerAccountForm() {
    const dispatch=useAppDispatch()
    const [activeStep,setActiveStep]=useState(0)


    const formik=useFormik({
        initialValues:{
            mobile:"",
            otp:"",
            GSTIN:"",
            pickupAddress:{
                name:"",
                mobile:"",
                address:"",
                city:"",
                state:"",
                pinCode:"",
                locality:""
            },
            bankDetail:{
                accountHolderName:"",
                accountNumber:"",
                ifsCode:""
            },
            sellerName:"",
            email:"",
            businessDetails:{
                businessName:"",
                businessEmail:"",
                busiinessMobile:"",
                logo:"",
                banner:"",
                businessAddress:""
            },
            password:"",

        },
        onSubmit:(values)=>{

            dispatch(createSeller(values))
            console.log(values)
        }
    })
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {
            steps.map((label,index)=>(
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                    </Step>
            ))}


      </Stepper>

      <div className='mt-20 space-y-10'>
    {    
    activeStep==0?(<BecomeSellerStep1 formik={formik}/>):
    activeStep==1?(<BecomeSellerStep2  formik={formik}/>):
    activeStep==2?(<BecomeSellerStep3 formik={formik}/>)
    :(<BecomeSellerStep4 formik={formik}/>)   }
  
    
        </div>
<div className='flex items-center justify-between mt-5'>
  <Button
    variant='contained'
    disabled={activeStep === 0}
    onClick={() => setActiveStep(activeStep - 1)}
  >
    Back
  </Button>

  <Button
    variant='contained'
    onClick={() => {
      if (activeStep === steps.length - 1) {
        formik.handleSubmit();
      } else {
        setActiveStep(activeStep + 1);
      }
    }}
  >
    {activeStep === steps.length - 1 ? "Create Account" : "Next"}
  </Button>
</div>
    </div>
  )
}

export default SellerAccountForm
