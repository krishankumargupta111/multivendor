import { TextField } from '@mui/material'



function BecomeSellerStep3({formik}:any) {
  return (
    <div className='space-y-5'>
      
      <div>

       <TextField
              fullWidth
              name="bankDetail.accountNumber"
              label="Account Number"
              value={formik.values.bankDetail.accountNumber}
              onChange={formik.handleChange}
              error={formik.touched.bankDetail?.accountNumber && Boolean(formik.errors.bankDetail?.accountNumber)}
              helperText={formik.touched.bankDetail?.accountNumber && formik.errors.bankDetail?.accountNumber}
              />
</div>
<div>
   
       <TextField
              fullWidth
              name="bankDetail.ifscCode"
              label="IFSC Code"
              value={formik.values.bankDetail.ifscCode}
              onChange={formik.handleChange}
              error={formik.touched.bankDetail?.ifscCode && Boolean(formik.errors.bankDetail?.ifscCode)}
              helperText={formik.touched.bankDetail?.ifscCode && formik.errors.bankDetail?.ifscCode}
              />
              </div>

           <div>    
       <TextField
              fullWidth
              name="bankDetail.accountHolderName"
              label="Account Holder Name"
              value={formik.values.bankDetail.accountHolderName}
              onChange={formik.handleChange}
              error={formik.touched.bankDetail?.accountHolderName && Boolean(formik.errors.bankDetail?.accountHolderName)}
              helperText={formik.touched.bankDetail?.accountHolderName && formik.errors.bankDetail?.accountHolderName}
              />
            </div>  

                      
    </div>
  )
}

export default BecomeSellerStep3
