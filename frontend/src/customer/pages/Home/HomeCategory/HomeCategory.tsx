import { useAppSelector } from '../../../../redux/store'
import HomeCategoryCard from './HomeCategoryCard'
function HomeCategory() {
  
     const categories=useAppSelector((store)=>store.
        homeCategory.homeCategories?.shopByCategory)
  return (
    <div className='flex  justify-center gap-7 flex-wrap'>
      {categories?.map((item)=><HomeCategoryCard key={item.name} item={item}/>)}
    </div>
  )
}

export default HomeCategory
