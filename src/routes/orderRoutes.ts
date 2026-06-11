import express from "express";
import { isLoggedIn, isAdmin } from "../validation/authValidator";
import { createOrder, FetchAllOrdersCreatedByUser, FetchOrderById, cancelOrder, changeOrderStatus } from "../controller/orderController";

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createOrder);
orderRouter.get('/', isLoggedIn, FetchAllOrdersCreatedByUser);
orderRouter.get('/:orderId', isLoggedIn, FetchOrderById);
orderRouter.put('/:orderId/cancel', isLoggedIn, cancelOrder);
orderRouter.put('/:orderId/status', isLoggedIn, isAdmin, changeOrderStatus);

export default orderRouter;