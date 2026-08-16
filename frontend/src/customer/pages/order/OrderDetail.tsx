import { Box, Button, Divider } from "@mui/material";
import { useEffect } from "react";
import OrderStepper from "./OrderStepper";
import { Payment } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  cancelOrder,
  fetchOrderById,
  fetchOrderItemById,
} from "../../../redux/features/customer/OrderSlice";
import { useParams } from "react-router";

function OrderDetail() {
  const dispatch = useAppDispatch();

  const { orderItemId, orderId } = useParams();

  const { orderItem, currentOrder } = useAppSelector(
    (store) => store.order
  );

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) return;

    if (orderItemId) {
      dispatch(
        fetchOrderItemById({
          jwt,
          orderItemId,
        })
      );
    }

    if (orderId) {
      dispatch(
        fetchOrderById({
          jwt,
          orderId,
        })
      );
    }
  }, [dispatch, orderItemId, orderId]);

  const handleCancelOrder = async () => {
    if (!orderId) return;

    dispatch(cancelOrder(orderId));
  };

  const totalSellingPrice =
    currentOrder?.totalSellingPrice ?? 0;

  const mrpPrice = orderItem?.mrpPrice ?? 0;

  const savedAmount = mrpPrice - totalSellingPrice;

  return (
    <Box className="space-y-5">

      {/* Product */}
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[100px]"
          src={orderItem?.product?.images?.[0]}
          alt=""
        />

        <div className="text-sm space-y-1 text-center">
          <h1>Bazaar</h1>

          <p>
            {orderItem?.product?.title}
          </p>

          <p>size : FREE</p>
        </div>
      </section>

      {/* Order Status */}
      <section className="border border-gray-200 p-5">
        <OrderStepper
          orderStatus={currentOrder?.orderStatus ?? ""}
        />
      </section>

      {/* Delivery Address */}
      <section className="border border-gray-200 p-5">
        <h1 className="font-bold pb-3">
          Delivery Address
        </h1>

        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">

            <p>
              {currentOrder?.user?.fullName}
            </p>

            <Divider
              flexItem
              orientation="vertical"
            />
          </div>

          <p>
            {currentOrder?.shippingAddress?.address},{" "}
            {currentOrder?.shippingAddress?.locality},{" "}
            {currentOrder?.shippingAddress?.city},{" "}
            {currentOrder?.shippingAddress?.state},{" "}
            {currentOrder?.shippingAddress?.pincode}
          </p>
        </div>
      </section>

      {/* Price */}
      <section className="border border-gray-200 space-y-4">

        <div className="flex justify-between text-sm pt-5 px-5">

          <div className="space-y-1">

            <p className="font-bold">
              Total Item Price
            </p>

            <p>
              You Saved{" "}
              <span className="text-green-400">
                ₹ {savedAmount}
              </span>{" "}
              on this item
            </p>

          </div>

          <p>
            ₹ {totalSellingPrice}
          </p>

        </div>

        {/* Payment */}
        <div className="p-5">

          <div
            className="bg-teal-50 px-5 py-2 text-xs font-medium
            flex items-center gap-3"
          >
            <Payment />

            <p>Pay on Delivery</p>
          </div>

        </div>

        <Divider />

        <div className="px-5 pb-2 pt-5" />

        {/* Cancel */}
        <div className="p-10">

          <Button
            fullWidth
            variant="outlined"
            onClick={handleCancelOrder}
          >
            Cancel Order
          </Button>

        </div>

      </section>
    </Box>
  );
}

export default OrderDetail;