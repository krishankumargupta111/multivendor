import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";


function OrderCard({orderItem,order}:any) {
 const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/account/orders/${order._id}/item/${orderItem._id}`)}
      className="text-sm bg-white p-5 space-y-4 border border-gray-200
     rounded-md cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: "#00927c" }}>
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold text-teal-600">{order.orderStatus}</h1>
          <p>Arriving by {order.deliveryDate}</p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div className="">
          <img
            className="w-[70px]"
            src={orderItem.product?.images[0]}
            alt=""
          />
        </div>
        <div className="w-fll space-y-2">
          <h1 className="font-bold">Bazaar</h1>
          <p>{orderItem.product?.title}</p>
          <p>
            <strong>size :</strong>FREE
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
