import React from 'react'
import HomeCategoryTableTable from './HomeCategoryTable'
import HomeCategoryTable from './HomeCategoryTable'
import { useAppSelector } from '../../redux/store'

function ShopByTable() {

   const homeCategories=useAppSelector((store)=>store.
          homeCategory.homeCategories)
  return (

    <div>
      <HomeCategoryTable categories={homeCategories?.shopByCategory}/>
    </div>
  )
}

export default ShopByTable
