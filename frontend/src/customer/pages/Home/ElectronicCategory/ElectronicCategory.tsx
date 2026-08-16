import { useAppSelector } from "../../../../redux/store"
import ElectronicCategorycard from "./ElectronicCategorycard"

function ElectronicCategory() {

    const homeCategories=useAppSelector((store)=>store.
    homeCategory.homeCategories)
  return (
    <div className="flex flex-wrap justify-between py-5 px-20 border border-gray-300">
      {homeCategories?.
      electricCategories?.slice(0,7)?.map((item)=><ElectronicCategorycard  key={item.name}item={item}/>)}
    </div>
  )
}

export default ElectronicCategory
