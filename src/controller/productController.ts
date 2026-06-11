import {
  Request,
  Response,
} from "express";

import * as ProductService from "../service/productService";

import { ApiError } from "../utils/ApiError";

import { CreateProductDto } from "../types/product.types";

export async function createProduct(
  req: Request<
    {},
    {},
    CreateProductDto
  >,
  res: Response
): Promise<Response> {
  try {
    const newProduct =
      await ProductService.createProductService(
        req.body,
        req.file
      );

    return res.status(201).json({
      success: true,
      message:
        "Product created successfully",
      data: newProduct,
      error: null,
    });
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({
          success: false,
          message: error.message,
          data: null,
          error: null,
        });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
      data: null,
      error: null,
    });
  }
}

export async function fetchAllProduct(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const products =
      await ProductService.fetchProductsService();

    return res.status(200).json({
      success: true,
      message:
        "Product fetched successfully",
      data: products,
      error: null,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
      data: null,
      error: null,
    });
  }
}

export async function fetchSingleProduct(
  req: Request<{
    productId: string;
  }>,
  res: Response
): Promise<Response> {
  try {
    const product =
      await ProductService.fetchProductByIdService(
        req.params.productId
      );

    return res.status(200).json({
      success: true,
      message:
        "Product fetched successfully",
      data: product,
      error: null,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
      data: null,
      error: null,
    });
  }
}

export async function updateProduct(
  req: Request<{
    productId: string;
  }>,
  res: Response
): Promise<Response> {
  try {
    const updatedProduct =
      await ProductService.updateProductService(
        req.params.productId,
        req.body,
        req.file
      );

    return res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      data: updatedProduct,
      error: null,
    });
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({
          success: false,
          message: error.message,
          data: null,
          error: null,
        });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
      data: null,
      error: null,
    });
  }
}

export async function deleteProduct(
  req: Request<{
    productId: string;
  }>,
  res: Response
): Promise<Response> {
  try {
    const deletedProduct =
      await ProductService.deleteProductService(
        req.params.productId
      );

    return res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
      data: deletedProduct,
      error: null,
    });
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({
          success: false,
          message: error.message,
          data: null,
          error: null,
        });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
      data: null,
      error: null,
    });
  }
}