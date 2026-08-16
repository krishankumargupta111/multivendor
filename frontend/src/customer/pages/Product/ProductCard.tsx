import  { useState } from 'react'
import { useEffect } from 'react';
import "./ProductCard.css"
import { useNavigate } from 'react-router';


function ProductCard({item}:any) {
    const [isHovered,setIsHovered]=useState(false)
    const[currentImage,setCurrentImage]=useState(1)
    const navigate=useNavigate()
    

    useEffect(()=>{
let interval:any;
if(isHovered){
  interval=setInterval(()=>setCurrentImage
  ((prev)=>(prev+1)% item.images.length),1000)
}

else if(interval){
  clearInterval(interval)
}
return ()=>clearInterval(interval)
    },[isHovered,item.images.length])




  return (
    <div onClick={()=>navigate(`/product-detail/${item.category}/${item.title}/${item._id}`)}
     className='group px-4 relative'>
        <div onMouseEnter={()=>setIsHovered(true)} 
        onMouseLeave={()=>setIsHovered(false)}
        className='z-1 relative w-[250px]
        sm:w-full h-[350px] overflow-hidden'>
{item.images.map((image:string,index:number)=><img src={image} 
className='card-media
object-top' key={index}
style={{transform:`translateX(${(index-currentImage)*100}%)`}}
/>)}
 
        </div>
        <div className='details pt-3 space-y-1 group-hover-effect
        rounded-md'>
          <div className='name space-y'>
         
            <p>{item.description}</p>
          </div>
          <div className='price flex items-center gap-3'>
            <span className='font-semibold text-teal-800'>
             ₹{item.sellingPrice}
            </span>
            <span className='text font-thin line-through'>
             ₹{item.mrpPrice}</span>
            <span className='font-semibold text-teal-600'>{item.discountPercent}% off</span>
          </div>
        </div>

      
    </div>
  )
}

export default ProductCard
