const express = require('express');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');
const { createOrder, FetchAllOrdersCreatedByUser, FetchOrderById, cancelOrder, changeOrderStatus } = require('../controller/orderController');

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createOrder);
orderRouter.get('/', isLoggedIn, FetchAllOrdersCreatedByUser);
orderRouter.get('/:orderId', isLoggedIn, FetchOrderById);
orderRouter.put('/:orderId/cancel', isLoggedIn, cancelOrder);
orderRouter.put('/:orderId/status', isLoggedIn, isAdmin, changeOrderStatus);

module.exports = orderRouter;