const express = require('express');
const { getCart, modifyItemsToCart, clearCart } = require('../controller/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCart);
cartRouter.post('/:operation/:productId', isLoggedIn, modifyItemsToCart)
cartRouter.delete('/items', isLoggedIn, clearCart)

module.exports = cartRouter;