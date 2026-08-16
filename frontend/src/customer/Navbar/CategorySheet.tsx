
import {Box} from '@mui/material'
import { menLevelTwo } from '../../data/category/levelTwo/menLevelTwo'
import { womenLevelTwo } from '../../data/category/levelTwo/womenLevelTwo'
import { electronicsLevelTwo } from '../../data/category/levelTwo/electronicLevelTwo'
import { furnitureLevelTwo } from '../../data/category/levelTwo/furnitureLevelTwo'
import { menLevelThree } from '../../data/category/levelThree/menLevelThree'
import { womenLevelThree } from '../../data/category/levelThree/womenThree'
import { electronicsLevelThree } from '../../data/category/levelThree/electronicLevelThree'
import { furnitureLevelThree } from '../../data/category/levelThree/furnitureLevelThree'
import { useNavigate } from 'react-router'

const categoryTwo:{[key:string]:any[]}={
  men:menLevelTwo,
  women:womenLevelTwo,
  electronics:electronicsLevelTwo,
  home_furniture:furnitureLevelTwo
}
const categoryThree:{[key:string]:any[]}={
  men:menLevelThree,
  women:womenLevelThree,
  electronics:electronicsLevelThree,
  home_furniture:furnitureLevelThree
}

function CategorySheet({selectedCategory}:any) {
  const navigate=useNavigate()
  
  
  const childCategory=(category:any,parentCategoryId:any)=>{
    return category.filter((child:any)=>child.parentCategoryId===parentCategoryId)
  }
  return (
    <Box className='bg-white shadow-lg lg:h-[500px] overflow-auto z-50'>
        <div className='flex text-sm flex-wrap'>

        {categoryTwo[selectedCategory]?.map((item,index)=><div
        className={`p-8 lg:w-[20%] ${index%2==0?"bg-slate-50":"bg-white"}`}
        key={item.name}>
          <p className='text-[#00927c] mb-5 font-semibold'>{item.name}</p>
          
          <ul className='space-y-3 text-gray-500 '>
            {childCategory(categoryThree[selectedCategory],item.categoryId)
            ?.map((item:any)=>
            <div key={item.name}>
            <li onClick={()=>navigate(`/products/${item.categoryId}`)}className='cursor-pointer'>
                {item.name}
              </li>
            </div>)}
          </ul>
        </div>)}  
        </div>
      
    </Box>
  )
}

export default CategorySheet
