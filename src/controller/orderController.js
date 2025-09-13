const { createOrderService, fetchOrdersByUserIdService, fetchOrdersByIdService, updateOrderService } = require("../service/orderService");
const AppError = require("../utils/appError");

async function createOrder(req, res) {
    try {
        const userId = req.user.id;

        const order = await createOrderService(userId, req.body.paymentMethod);
        return res.status(201).json({
            success: true,
            message: "Successfully created the order",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function FetchAllOrdersCreatedByUser(req, res) {
    try {
        const userId = req.user.id;

        const order = await fetchOrdersByUserIdService(userId);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the orders",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function FetchOrderById(req, res) {
    try {
        const orderId = req.params.orderId;

        const order = await fetchOrdersByIdService(orderId);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the order",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function cancelOrder(req, res) {
    try {
        const orderId = req.params.orderId;

        const order = await updateOrderService(orderId, "CANCELLED");
        return res.status(200).json({
            success: true,
            message: "Successfully updated the order",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

async function changeOrderStatus(req, res) {
    try {
        const orderId = req.params.orderId;
        const status = req.body.status;

        const order = await updateOrderService(orderId, status);
        return res.status(200).json({
            success: true,
            message: "Successfully updated the status of order",
            data: order,
            error: {}
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}

module.exports = {
    createOrder,
    changeOrderStatus,
    cancelOrder,
    FetchOrderById,
    FetchAllOrdersCreatedByUser
}