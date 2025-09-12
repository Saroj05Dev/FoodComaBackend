const express = require('express');
const { getCart, modifyItemsToCart } = require('../controller/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCart);
cartRouter.post('/:operation/:productId', isLoggedIn, modifyItemsToCart)

module.exports = cartRouter;