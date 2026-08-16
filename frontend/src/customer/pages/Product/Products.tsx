import  { useState } from 'react'
import { Divider, FormControl,InputLabel } from '@mui/material'
import {Select,MenuItem,Pagination} from '@mui/material'


import FilterSection from './FilterSection'
import ProductCard from './ProductCard'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { getAllProducts} from '../../../redux/features/customer/ProductSlice'




function Products() {
  const {categoryId}=useParams()

  console.log("param",categoryId)
  
  const dispatch=useAppDispatch()
  const [searchParams] = useSearchParams();
  const color = searchParams.get("color");
const price = searchParams.get("price");
const [sort,setSort]=useState("price_low")

let minPrice = 0;
let maxPrice = 100000;

if (price === "500") {
  minPrice = 0;
  maxPrice = 500;
} else if (price) {
  const [min, max] = price.split("-");
  minPrice = Number(min);
  maxPrice = Number(max);
}
useEffect(() => {
  if (categoryId) {
    dispatch(
      getAllProducts({
        category: categoryId,
        color,
        minPrice,
        maxPrice,
        pageNumber: 0,
        sort,
      })
    );
  }
}, [categoryId, color, price,sort, dispatch]);


  
  const product=useAppSelector(store=>store.product)
  console.log("category id",categoryId)
  const handleSortProduct=(e:any)=>{
    setSort(e.target.value)
    
  }
 
  return (
    <div className='-z-10 mt-10'>
       <div>
        <h1 className='text-3xl text-center font-bold text-gray-700
        pb-5 px-9 space-x-2'>
            {categoryId}
        </h1>
        
       </div>
       <div className='lg:flex'>
        <section className='z-1 hidden lg:block w-[20%] min-h-screen
        border-gray-300'>
            <FilterSection/>
        </section>
        <section className='z-1 w-full lg:w-[80%] space-y-5 '>

            <div className='flex justify-between items-center px-9
            h-[40px]'>
                <div>

                </div>
      <FormControl >
  <InputLabel id="sort">Sort</InputLabel>
  <Select
    labelId="sort"
    id="sort"
    value={sort}
    label="Sort"
    onChange={handleSortProduct}
  >
    <MenuItem value={"price_low"}>Price:Low-High</MenuItem>
    <MenuItem value={"price_high"}>Price:High-Low</MenuItem>

  </Select>
</FormControl>
            </div>

            <Divider/>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      gap-y-4 px-5 justify-center mt-5'>

        
        {product?.products?.map((item,index)=> <div key={index*3}>
            <ProductCard item={item}/>
            </div>)}
      </div>
      <div className='flex flex-col items-center justify-center'>
    <Pagination count={product.totalPages} />
</div>
        </section>

       </div>
    </div>
  )
}

export default Products
