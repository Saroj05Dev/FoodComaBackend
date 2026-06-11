import express from 'express';
import * as CartController from '../controller/cartController';
import { isLoggedIn } from '../validation/authValidator';
const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, CartController.getCart);
cartRouter.post('/:operation/:productId', isLoggedIn, CartController.modifyItemsToCart);
cartRouter.delete('/items', isLoggedIn, CartController.clearCart);

export default cartRouter;