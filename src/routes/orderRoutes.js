const express = require('express');
const { isLoggedIn } = require('../validation/authValidator');
const { createOrder } = require('../controller/orderController');

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createOrder);

module.exports = orderRouter;