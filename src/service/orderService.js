const { getCartRepository, clearCartRepository } = require("../repository/cartRepository");
const { createOrderRepository, fetchOrdersByUserIdRepository, fetchOrderByIdRepository, updateOrderStatusRepo } = require("../repository/orderRepository");
const { findUser } = require("../repository/userRepository");
const BadRequestError = require("../utils/badRequestError");
const InternalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function createOrderService(userId, paymentMethod) {

    const cart = await getCartRepository(userId);
    const user = await findUser({ _id: cart.user });
    if(!cart) {
        throw new NotFoundError("Cart")
    }

    if(cart.items.length === 0) {
        throw new BadRequestError(["Cart is empty, please add some items to the cart"])
    }

    const orderObject = {};

    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartItem => {
        return { product: cartItem.product._id, quantity: cartItem.quantity }
    });
    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
    });
    orderObject.address = user.address;
    orderObject.paymentMethod = paymentMethod;

    const order = await createOrderRepository(orderObject);

    if(!order) {
        throw new InternalServerError()
    }

    await clearCartRepository(userId);

    return order
}

async function fetchOrdersByUserIdService(userId) {
    const orders = await fetchOrdersByUserIdRepository(userId)
    if(!orders) {
        throw new NotFoundError('orders')
    }
    return orders
}

async function fetchOrdersByIdService(orderId) {
    const orders = await fetchOrderByIdRepository(orderId)
    if(!orders) {
        throw new NotFoundError('orders')
    }
    return orders
}

async function updateOrderService(orderId, status) {
    const updatedOrder = await updateOrderStatusRepo(orderId, status)
    if(!updatedOrder) {
        throw new NotFoundError('orders')
    }
    return updatedOrder
}

module.exports = {
    createOrderService,
    fetchOrdersByUserIdService,
    fetchOrdersByIdService,
    updateOrderService
}