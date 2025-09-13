const { createOrderService } = require("../service/orderService");
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

module.exports = {
    createOrder
}