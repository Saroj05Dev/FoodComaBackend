const { getCartService } = require("../service/cartService");
const AppError = require("../utils/appError");

async function getCart(req, res) {
    try {
        const userId = req.user.id
        const cart = await getCartService(userId)
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the cart",
            data: cart,
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
    getCart
}