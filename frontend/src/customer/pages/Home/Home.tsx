import Deal from "./deal/Deal"
import Grid from "./grid/Grid"
import { Button } from "@mui/material"
import HomeCategory from "./HomeCategory/HomeCategory"
import ElectronicCategory from "./ElectronicCategory/ElectronicCategory"
import { Storefront } from "@mui/icons-material"
function Home() {
  return (
    <div className="space-y-10">
      <ElectronicCategory/>
      <section>
        <Grid/>
      </section>
      <section className="pt-10">
        <h1 className="text-3xl font-bold text-center pb-5">
          Todays Deal
        </h1>
        <Deal/>
      </section>
      <section className="pt-10">
        <h1 className="text-3xl font-bold text-center pb-5">
          Shop By Category
        </h1>
        <HomeCategory/>
      </section>
      <section className="lg:px-20 relative h-[200px] lg:h-[450px]
      objetc-cover">
   
        <img src="https://zosh-bazzar.vercel.app/seller_banner_image.jpg"
         alt=""/>
<div className="absolute top-1/2 left-4
 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3">
<h1>Sell Your Product</h1>
<p className="text-lg md:text-2xl">With<strong
className="logo text-3xl md:text-5xl pl-2">Bazaar</strong></p>
<div className="pt-6 flex justify-center">
  <Button startIcon={<Storefront/>} variant='contained'>Become Seller</Button>
</div>
</div>
      </section>
    </div>
  )
}

export default Home
