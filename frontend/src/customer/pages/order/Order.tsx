import OrderCard from "./OrderCard";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchUserOrderHistory } from "../../../redux/features/customer/OrderSlice";
import { useEffect } from "react";

function Order() {
  const dispatch = useAppDispatch();

  const order = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All Orders</h1>
        <p>from anytime</p>
      </div>

      <div className="space-y-2">
        {order.orders
          .filter((order) => order.orderStatus !== "CANCELLED")
          .map((order) =>
            order?.orderItems.map((orderItem) => (
              <OrderCard
                orderItem={orderItem}
                order={order}
                key={orderItem._id}
              />
            ))
          )}
      </div>
    </div>
  );
}

export default Order