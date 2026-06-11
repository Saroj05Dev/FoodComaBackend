import Order from "../schema/orderSchema";

import {
  IOrder,
  OrderDocument,
  OrderStatus,
} from "../types/order.types";

export async function createOrderRepository(
  orderDetails: Partial<IOrder>
): Promise<OrderDocument> {
  return Order.create(orderDetails);
}

export async function fetchOrdersByUserIdRepository(
  userId: string
): Promise<OrderDocument[]> {
  return Order.find({
    user: userId,
  }).populate("items.product");
}

export async function fetchOrderByIdRepository(
  orderId: string
): Promise<OrderDocument | null> {
  return Order.findById(
    orderId
  ).populate("items.product");
}

export async function updateOrderStatusRepo(
  orderId: string,
  status: OrderStatus
): Promise<OrderDocument | null> {
  return Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
}