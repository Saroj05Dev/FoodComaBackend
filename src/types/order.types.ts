import { HydratedDocument, Types } from "mongoose";

export type OrderStatus =
  | "ORDERED"
  | "CANCELLED"
  | "DELIVERED"
  | "PROCESSING"
  | "OUT_FOR_DELIVERY";

export type PaymentMethod =
  | "ONLINE"
  | "OFFLINE";

export interface OrderItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface IOrder {
  user: Types.ObjectId;

  items: OrderItem[];

  totalPrice: number;

  status: OrderStatus;

  address: string;

  paymentMethod: PaymentMethod;

  createdAt?: Date;
  updatedAt?: Date;
}

export type OrderDocument =
  HydratedDocument<IOrder>;