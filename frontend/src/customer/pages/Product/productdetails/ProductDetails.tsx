import {
  Add,
  AddShoppingCart,
  Favorite,
  LocalShipping,
  Remove,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import SimilarProduct from "./SimilarProduct";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { fetchProductById } from "../../../../redux/features/customer/ProductSlice";
import { useParams } from "react-router";
import { addItemToCart } from "../../../../redux/features/customer/CartSlice";

function ProductDetails() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

const dispatch=useAppDispatch()
const {productId,categoryId}=useParams()
const product=useAppSelector(store=>store.product)


useEffect(()=>{
  dispatch(fetchProductById(productId))
},[dispatch])


  const handleChangeCurrentImage = (index: number) => setCurrentImage(index);
  const handleQuantityChange = (value: number) => setQuantity(value + quantity);
const item={
  quantity:quantity,
  size:"M",
  productId:product.product?._id,

  
}
    const addCartItem=()=>{
dispatch(addItemToCart({jwt:localStorage.getItem("jwt"),request:item}))
    }
  return (
    <div className="min-h-screen px-5 lg:px-20 pt-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div
            className="w-full lg:w-[15%] flex flex-wrap lg:flex-col
                gap-3"
          >
            {product.product?.images.map((item, index) => (
              <img
                onClick={() => handleChangeCurrentImage(index)}
                className="lg:w-full
                    w-[50px] cursor-pointer rounded-md "
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md "
              src={product.product?.images[currentImage]}
              alt=""
            />
          </div>
        </section>

        <section>
          <h1 className="font-bold text-lg text-teal-500">Zosh Clothing</h1>
          <p className="text-gray-500 font-semibold">{product.product?.title}</p>
          <div
            className="flex justify-between items-center py-2 border
                border-gray-300 w-[180px]
                px-3 mt-5"
          >
            <div className="flex gap-1 items-center">
              <span>4</span>
              <Star color="primary" />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>478 Rating</span>
          </div>
          <div className="space-y-2 pt-5">
            <div className="price flex items-center gap-3">
              <span className="font-semibold text-teal-800">
                ₹{product.product?.sellingPrice}</span>
              <span className="text font-thin line-through">
                ₹{product.product?.mrpPrice}</span>
              <span className="font-semibold text-teal-600">
                {product.product?.discountPercent}% off</span>
            </div>
            <p className="text-sm">
              Inclusive of all taxes.Free shipping above 1500.
            </p>
          </div>
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield color="primary" />
              <p>Authentic & Quantity Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium color="primary" />
              <p>100% money back gurantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping color="primary" />
              <p>Free shipping & Return</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet color="primary" />
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          <div className="mt-7 space-y-2 ">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                onClick={() => handleQuantityChange(-1)}
                variant="outlined"
              >
                <Remove />
              </Button>

              <span>{quantity}</span>
              <Button
                onClick={() => handleQuantityChange(1)}
                variant="outlined"
              >
                <Add />
              </Button>
            </div>
          </div>
          <div className="mt-12 flex items-center gap-5">
            <Button
              startIcon={<AddShoppingCart />}
              variant="outlined"
              fullWidth
              sx={{ py: "1rem" }}
              onClick={addCartItem}
            >
              Add to Bag
            </Button>
            <Button
              startIcon={<Favorite />}
              variant="outlined"
              fullWidth
              sx={{ py: "1rem" }}
            >
              Whichlist
            </Button>
          </div>
          <div className="mt-5">
            <p>
            {product.product?.description}
            </p>
          </div>
          </section>
      </div>
       
    </div>
  );
}

export default ProductDetails;
