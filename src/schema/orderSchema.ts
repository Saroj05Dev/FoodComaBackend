import mongoose, {
  Schema,
} from "mongoose";

import {
  IOrder,
} from "../types/order.types";

const orderSchema =
  new Schema<IOrder>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      items: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },

          quantity: {
            type: Number,
            default: 1,
            required: true,
          },
        },
      ],

      totalPrice: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "ORDERED",
          "CANCELLED",
          "DELIVERED",
          "PROCESSING",
          "OUT_FOR_DELIVERY",
        ],
        default: "ORDERED",
      },

      address: {
        type: String,
      },

      paymentMethod: {
        type: String,
        enum: [
          "ONLINE",
          "OFFLINE",
        ],
        default: "OFFLINE",
      },
    },
    {
      timestamps: true,
    }
  );

const Order =
  mongoose.model<IOrder>(
    "Order",
    orderSchema
  );

export default Order;