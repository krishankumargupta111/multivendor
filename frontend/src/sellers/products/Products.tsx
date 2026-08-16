import { useEffect } from "react";
import ProductTable from "./ProductTable";

import { useAppDispatch } from "../../redux/store";
import { fetchSellerProduct } from "../../redux/features/seller/SellerProductSlice";

function Products() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSellerProduct(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <>
      <h1 className="pb-5 font-bold text-xl">
        All Products
      </h1>

      <ProductTable />
    </>
  );
}

export default Products;