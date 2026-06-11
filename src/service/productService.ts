import { Express } from "express";

import {
  createProductRepository,
  fetchProductsRepository,
  fetchProductByIdRepository,
  deleteProductRepository,
  updateProductRepository,
} from "../repository/productRepository";

import {
  CreateProductDto,
  IProduct,
  ProductDocument,
} from "../types/product.types";

import { ApiError } from "../utils/ApiError";

import { cloudinary } from "../config/cloudinaryConfig";

type UpdateProductDto = Partial<CreateProductDto> & {
  image?: string;
  imagePublicId?: string;
};

export async function createProductService(
  productDetails: CreateProductDto,
  file?: Express.Multer.File
): Promise<ProductDocument> {
  if (!file) {
    throw new ApiError(
      "Couldn't find file",
      404
    );
  }

  const payload = {
    ...productDetails,
    image: file.path,
    imagePublicId: file.filename,
  };

  return createProductRepository(
    payload
  );
}

export async function fetchProductsService(): Promise<
  ProductDocument[]
> {
  return fetchProductsRepository();
}

export async function fetchProductByIdService(
  productId: string
): Promise<ProductDocument | null> {
  return fetchProductByIdRepository(
    productId
  );
}

export async function updateProductService(
  productId: string,
  updatedData: UpdateProductDto,
  file?: Express.Multer.File
): Promise<ProductDocument | null> {
  const product =
    await fetchProductByIdRepository(
      productId
    );

  if (!product) {
    throw new ApiError(
      "Product not found",
      404
    );
  }

  if (file) {
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(
        product.imagePublicId
      );
    }

    updatedData.image = file.path;
    updatedData.imagePublicId =
      file.filename;
  }

  return updateProductRepository(
    productId,
    updatedData
  );
}

export async function deleteProductService(
  productId: string
): Promise<ProductDocument> {
  const product =
    await fetchProductByIdRepository(
      productId
    );

  if (!product) {
    throw new ApiError(
      "Product not found",
      404
    );
  }

  if (product.imagePublicId) {
    await cloudinary.uploader.destroy(
      product.imagePublicId
    );
  }

  await deleteProductRepository(
    productId
  );

  return product;
}