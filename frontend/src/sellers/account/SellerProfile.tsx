
import {  Divider } from '@mui/material'

import ProfileFieldCard from '../../customer/pages/account/ProfileFieldCard'
import { useAppSelector } from '../../redux/store'

function SellerProfile() {

    const {seller}=useAppSelector(store=>store)
  return (
    <div className='lg:px-20 pt-5 pb-20 space-y-20 '>
        <div className='w-full lg:w-[70%]'>
            <div className='flex items-center pb-3 justify-between
             '>
                <h1 className='font-bold text-xl'>Seller Detail</h1>

            </div>

<div>

    


    <div>
        <ProfileFieldCard keys={"Seller Name"} value={seller.profile?.sellerName}/>
        <Divider/>
          
          <ProfileFieldCard keys={"Seller Email"} value={seller.profile?.email}/>
          <Divider/>
            <ProfileFieldCard keys={"Seller Mobile"} value={seller.profile?.mobile}/>
    </div>
</div>

        </div>
      
    </div>
  )
}

export default SellerProfile
