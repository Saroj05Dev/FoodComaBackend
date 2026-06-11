import {
  getCartRepository,
  clearCartRepository,
} from "../repository/cartRepository";

import {
  createOrderRepository,
  fetchOrdersByUserIdRepository,
  fetchOrderByIdRepository,
  updateOrderStatusRepo,
} from "../repository/orderRepository";

import {
  findUser,
} from "../repository/userRepository";

import {
  OrderDocument,
  OrderStatus,
  PaymentMethod,
} from "../types/order.types";

import { ApiError } from "../utils/ApiError";

export async function createOrderService(
  userId: string,
  paymentMethod: PaymentMethod
): Promise<OrderDocument> {
  const cart =
    await getCartRepository(
      userId
    );

  if (!cart) {
    throw new ApiError(
      "Cart not found",
      404
    );
  }

  if (
    cart.items.length === 0
  ) {
    throw new ApiError(
      "Cart is empty",
      400
    );
  }

  const user =
    await findUser({
      _id: cart.user,
    } as any);

  if (!user) {
    throw new ApiError(
      "User not found",
      404
    );
  }

  let totalPrice = 0;

  cart.items.forEach(
    (item: any) => {
      totalPrice +=
        item.quantity *
        item.product.price;
    }
  );

  const order =
    await createOrderRepository({
      user: cart.user,

      items: cart.items.map(
        (item: any) => ({
          product:
            item.product._id,
          quantity:
            item.quantity,
        })
      ),

      status: "ORDERED",

      totalPrice,

      address:
        user.address ?? "",

      paymentMethod,
    });

  await clearCartRepository(
    userId
  );

  return order;
}

export async function fetchOrdersByUserIdService(userId: string) {
    const orders = await fetchOrdersByUserIdRepository(userId)
    if(!orders) {
        throw new ApiError('orders', 404)
    }
    return orders
}

export async function fetchOrderByIdService(orderId: string) {
    const orders = await fetchOrderByIdRepository(orderId)
    if(!orders) {
        throw new ApiError('orders', 404)
    }
    return orders
}

export async function updateOrderService(orderId: string, status: OrderStatus) {
    const updatedOrder = await updateOrderStatusRepo(orderId, status)
    if(!updatedOrder) {
        throw new ApiError('orders', 404)
    }
    return updatedOrder
}