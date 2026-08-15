

import HomeCategoryTable from '../HomePage/HomeCategoryTable';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { getAllCategories } from '../../redux/features/admin/CategorySlice';





export default function DealCategoryTable() {
  const dispatch=useAppDispatch()
useEffect(()=>{
  dispatch(getAllCategories())
},[])
      const categories = useAppSelector(
  (store) => store.category.categories
);

  return (
   <HomeCategoryTable categories={categories}/>
  );
}
