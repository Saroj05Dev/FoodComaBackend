import Product from "../schema/productSchema";
import { IProduct, ProductDocument } from "../types/product.types";

export async function createProductRepository(
  productDetails: Partial<IProduct>,
): Promise<ProductDocument> {
  const product = await Product.create(productDetails);
  return product;
}

export async function fetchProductsRepository(): Promise<ProductDocument[]> {
  const product = await Product.find();
  return product;
}

export async function fetchProductByIdRepository(
  productId: string,
): Promise<ProductDocument | null> {
  const product = await Product.findById(productId);
  return product;
}

export async function updateProductRepository(
  productId: string,
  updatedData: Partial<IProduct>,
): Promise<ProductDocument | null> {
  const deletedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return deletedProduct;
}

export async function deleteProductRepository(
  productId: string,
): Promise<ProductDocument | null> {
  const product = await Product.findByIdAndDelete(productId);
  return product;
}
