const express = require('express');
const { getCart } = require('../controller/cartController');
const { isLoggedIn } = require('../validation/authValidator');

const cartRouter = express.Router();

cartRouter.get('/', isLoggedIn, getCart);

module.exports = cartRouter;