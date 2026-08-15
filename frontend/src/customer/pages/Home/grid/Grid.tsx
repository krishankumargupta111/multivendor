import { Skeleton } from "@mui/material"
import { useAppSelector } from "../../../../redux/store"

function Grid() {

   const category=useAppSelector((store)=>store.
      homeCategory.homeCategories?.grid)


      if (!category) {
  return  <div>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
}
  return (
     <div className="grid gap-4 grid-rows-12 
    grid-cols-12 lg:h-[600px] px-5 lg:px-20">
      <div className="col-span-3 row-span-12 text-white rounded-md">
     <img className="w-full h-full object-cover rounded-md"
     src={category[0]?.image} alt=""/>
    </div>

     <div className="col-span-2 row-span-6 text-white rounded-md">
     <img className="w-full h-full object-cover rounded-md"
     src={category[1]?.image}alt=""/>
    </div>
    <div className="col-span-4 row-span-6 text-white rounded-md">
     <img className="w-full h-full object-cover rounded-md"
     src={category[2]?.image} alt=""/>
    </div>
    <div className="col-span-3 row-span-12 text-white rounded-md">
     <img className="w-full h-full object-cover rounded-md"
     src={category[3]?.image} alt=""/>
    </div>
     <div className="col-span-4 row-span-6 text-white rounded-md">
     <img className="w-full h-full object-cover rounded-md"
     src={category[4]?.image} alt=""/>
    </div>
     <div className="col-span-2 row-span-6 text-white rounded-md">
     <img className="w-full h-full object-cover rounded-md"
     src={category[5]?.image} alt=""/>
    </div>
    </div>
  )
}

export default Grid

