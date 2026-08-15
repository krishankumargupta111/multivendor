import { Box, InputLabel, MenuItem, Select, TextField, Typography,FormControl, Button } from '@mui/material'
import { useFormik } from 'formik'


import { useAppDispatch, useAppSelector } from '../../redux/store'
import { createDeal } from '../../redux/features/admin/DealSlice'
import { useEffect } from 'react'
import { getAllCategories } from '../../redux/features/admin/CategorySlice'

function CreateDealForm() {
  const dispatch=useAppDispatch()

useEffect(()=>{
  dispatch(getAllCategories())
},[])

const categories = useAppSelector((store) => store.category.categories);



  const formik=useFormik({
    initialValues:{
      discount:0,
      categoryId:""
    },
    onSubmit:(values)=>{
console.log(values)
dispatch(createDeal(values))
    }
  })
  return (
    <Box sx={{width:600,margin:"auto",padding:3}} className='space-y-6'
    component={"form"} onSubmit={formik.handleSubmit}>
      <div>
<Typography variant='h4' sx={{textAlign:"center"}}>Create New Deal

</Typography>
</div>
<div>
  <TextField fullWidth
  name="discount"
  label="Discount"
  value={formik.values.discount}
  onChange={formik.handleChange}
  />

</div>
<div>

<FormControl fullWidth required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
            id='categoryId' 
            labelId='category-label' 
            name='categoryId' 
            value={formik.values.categoryId}
            onChange={formik.handleChange} 
            label='category'>
          
              {
              categories.map((item) => (
  <MenuItem key={item._id} value={item._id}>
    {item.name}
  </MenuItem>
))
              }
            </Select>

          </FormControl>
</div>


<div>
  <Button fullWidth sx={{py:"11px"}} type="submit" variant='contained' >
    Create Deal
  </Button>
</div>
    </Box>

  )
}

export default CreateDealForm
