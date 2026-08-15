import { Button, Divider, FormControl, 
  FormLabel,RadioGroup,FormControlLabel,Radio} from '@mui/material'
import { teal } from '@mui/material/colors'
import { colors } from '../../../data/filters/color'
import { useState } from 'react'
import { priceRanges } from '../../../data/filters/price'
import { useSearchParams } from 'react-router'

function FilterSection() {
  const [searchParams, setSearchParams] = useSearchParams();


  const[expandColor,setExpandColor]=useState(false)
  const handleExpandColor=()=>setExpandColor(!expandColor)


const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const color = e.target.value;


  setSearchParams({
    color,
    price: searchParams.get("price") || "",
 
  });
};

 const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const price = e.target.value;


  setSearchParams({
    color: searchParams.get("color") || "",
    price,
    
  });
};
const handleClearAll = () => {
  setSearchParams({});
};

  return (
    <div className='-z-50 space-y-5 bg-white'>
      <div className='flex items-center justify-between h-[40px]
      px-9 lg:border-r'>
        <p className='text-lg font-semibold'>Filters</p>
        <Button onClick={handleClearAll}>clear all</Button>
</div>
<Divider/>
<div className='px-9 space-y-6 mt-5'>
<section >
  
  <FormControl sx={{zIndex:0}}>
    <FormLabel sx={{fontSize:"16px",
      fontWeight:"bold",
      color:teal[600],
      
    }}>Color</FormLabel>

 <RadioGroup
value={searchParams.get("color") || ""}
  onChange={handleColorChange}
>
   { colors.slice(0,expandColor?colors.length:5).map((item:any)=>
   <FormControlLabel   key={item.name} value={item.name} 
   control={<Radio />} label={item.name} />)}
    
  </RadioGroup>
  </FormControl>
  <div>
    <Button onClick={handleExpandColor}>{expandColor?"hide":`+ ${colors.length-5}more`}</Button>
  </div>
<Divider/>
</section>
<section>
  <FormControl sx={{zIndex:0}}>
    <FormLabel sx={{fontSize:"16px",
      fontWeight:"bold",
      color:teal[600],
      
    }}>Price</FormLabel>

  
   <RadioGroup
value={searchParams.get("price") || ""}
  onChange={handlePriceChange}
>
   { priceRanges.map((item:any)=><FormControlLabel 
  key={item.value} value={item.value} 
   control={<Radio />} label={item.name} />)}
    
  </RadioGroup>
  </FormControl>
  
<Divider/>
</section>

</div>
    </div>
  )
}

export default FilterSection
