import mongoose from "mongoose";
import razorpay from "../config/razorpayClient.js";

import Order from "../model/Order.js";
import PaymentOrder from "../model/PaymentOrder.js";

import orderStatus from "../domain/OrderStatus.js";
import paymentStatus from "../domain/PaymentStatus.js";

class PaymentService {

    async createOrder(user, orders) {

        const amount = orders.reduce(
            (sum, order) => sum + order.totalSellingPrice,
            0
        );

        const paymentOrder = new PaymentOrder({
            amount,
            user: user._id,
            orders: orders.map(order => order._id),
            status: paymentStatus.PENDING
        });

return  await paymentOrder.save();


    }


    async createRazorpayPaymentLink(user, amount, orderId) {
    const paymentLink = await razorpay.paymentLink.create({
        amount: amount * 100,
        currency: "INR",
        customer: {
            name: user.fullName,
            email: user.email,
        },
        notify: {
            email: true,
        },
        callback_url: `http://localhost:5173/seller/payment/${orderId}`,
        callback_method: "get",
    });
    


    return paymentLink;
}

    async getPaymentOrderById(orderId) {

        const paymentOrder = await PaymentOrder.findById(orderId);

        if (!paymentOrder) {
            throw new Error("Payment order not found");
        }

        return paymentOrder;
    }

    async getPaymentOrderByPaymentLinkId(paymentLinkId) {
console.log("Searching paymentLinkId:", paymentLinkId);
        if (!paymentLinkId) {
            throw new Error("PaymentLinkId is required");
        }

        const paymentOrder = await PaymentOrder.findOne({
            paymentLinkId,
        });

        if (!paymentOrder) {
            throw new Error("Payment order not found");
        }

        return paymentOrder;
    }

    async proceedPaymentOrder(paymentOrder) {
    if (paymentOrder.status !== paymentStatus.PENDING) {
        return false;
    }

    await Promise.all(
        paymentOrder.orders.map(async (orderId) => {
            console.log("Order ID:", orderId);
            const order = await Order.findById(orderId);
            console.log("Found Order:", order);

            order.paymentStatus = paymentStatus.COMPLETED;
            order.orderStatus = orderStatus.PLACED;

            await order.save();
        })
    );

    paymentOrder.status = paymentStatus.SUCCESS;
    await paymentOrder.save();

    return true;
}
}

export default new PaymentService();