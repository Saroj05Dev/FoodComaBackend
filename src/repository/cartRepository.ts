import Cart from '../schema/cartSchema'
import { CartDocument } from '../types/cart.types';

export async function createCartRepository(
  userId: string
): Promise<CartDocument> {
  return Cart.create({ user: userId, items: [] });
}

export async function getCartRepository(
  userId: string
): Promise<CartDocument | null> {
  return Cart.findOne({ user: userId }).populate('items.product');
}

export async function clearCartRepository(
  userId: string
): Promise<CartDocument | null> {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error('Cart not found');
  }
  cart.items = [];
  return cart.save();
}