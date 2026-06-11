import {
  Request,
  Response,
} from "express";

import * as CartService from "../service/cartService";

import { ApiError } from "../utils/ApiError";

export async function getCart(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const cart =
      await CartService.getCartService(
        req.user!.id
      );

    return res.status(200).json({
      success: true,
      message:
        "Successfully fetched cart",
      data: cart,
      error: null,
    });
  } catch (error) {
    if (
      error instanceof ApiError
    ) {
      return res
        .status(
          error.statusCode
        )
        .json({
          success: false,
          message:
            error.message,
          data: null,
          error: null,
        });
    }

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong",
      data: null,
      error: null,
    });
  }
}

export async function modifyItemsToCart(
  req: Request<
    {
      productId: string;
      operation: string;
    }
  >,
  res: Response
): Promise<Response> {
  try {
    const cart =
      await CartService.modifyCart(
        req.user!.id,
        req.params.productId,
        req.params.operation ===
          "add"
      );

    return res.status(200).json({
      success: true,
      message:
        "Successfully modified cart",
      data: cart,
      error: null,
    });
  } catch (error) {
    if (
      error instanceof ApiError
    ) {
      return res
        .status(
          error.statusCode
        )
        .json({
          success: false,
          message:
            error.message,
          data: null,
          error: null,
        });
    }

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong",
      data: null,
      error: null,
    });
  }
}

export async function clearCart(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const cart =
      await CartService.clearItemsFromCart(
        req.user!.id
      );

    return res.status(200).json({
      success: true,
      message:
        "Successfully cleared cart",
      data: cart,
      error: null,
    });
  } catch (error) {
    if (
      error instanceof ApiError
    ) {
      return res
        .status(
          error.statusCode
        )
        .json({
          success: false,
          message:
            error.message,
          data: null,
          error: null,
        });
    }

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong",
      data: null,
      error: null,
    });
  }
}