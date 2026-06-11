import {
  getCartRepository,
  createCartRepository,
  clearCartRepository,
} from "../repository/cartRepository";
import { fetchProductByIdRepository } from "../repository/productRepository";
import { ApiError } from "../utils/ApiError";
import { CartDocument } from "../types/cart.types";

export async function getCartService(
  userId: string
): Promise<CartDocument> {
  let cart =
    await getCartRepository(
      userId
    );

  if (!cart) {
    // Create cart if it doesn't exist (for users registered before cart auto-creation)
    cart = await createCartRepository(userId);
  }

  return cart;
}

export async function modifyCart(
  userId: string,
  productId: string,
  shouldAdd = true
): Promise<CartDocument> {
  const cart =
    shouldAdd
      ? await getOrCreateCartService(userId)
      : await getCartService(userId);

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

  if (
    !product.inStock &&
    product.quantity <= 0
  ) {
    throw new ApiError(
      "Product not available in stock",
      400
    );
  }

  let foundProduct = false;

  cart.items.forEach(
    (item) => {
      if (
        item.product.toString() ===
        productId
      ) {
        foundProduct = true;

        if (shouldAdd) {
          if (
            product.quantity >=
            item.quantity + 1
          ) {
            item.quantity++;
          } else {
            throw new ApiError(
              "Requested quantity unavailable",
              400
            );
          }
        } else {
          item.quantity--;

          if (
            item.quantity <= 0
          ) {
            cart.items =
              cart.items.filter(
                (
                  cartItem
                ) =>
                  cartItem.product.toString() !==
                  productId
              );
          }
        }
      }
    }
  );

  if (
    !foundProduct &&
    shouldAdd
  ) {
    cart.items.push({
      product: product._id,
      quantity: 1,
    });
  }

  await cart.save();

  return cart;
}

async function getOrCreateCartService(
  userId: string
): Promise<CartDocument> {
  const cart = await getCartRepository(userId);

  if (cart) {
    return cart;
  }

  return createCartRepository(userId);
}

export async function clearItemsFromCart(
  userId: string
): Promise<CartDocument> {
  const updatedCart = await clearCartRepository(
    userId
  );
  if (!updatedCart) {
    throw new ApiError("Cart not found", 404);
  }
  return updatedCart;
}