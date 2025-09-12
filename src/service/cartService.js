const { getCartRepository } = require("../repository/cartRepository");
const NotFoundError = require("../utils/notFoundError");

async function getCartService(userId) {
    const cart = await getCartRepository(userId)

    if(!cart) {
        throw new NotFoundError("Cart")
    }

    return cart;
}

module.exports = {
    getCartService
}