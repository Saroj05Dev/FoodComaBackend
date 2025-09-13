const Order = require('../schema/orderSchema')

async function createOrderRepository(orderDeatails) {
    try {
        const order = await Order.create(orderDeatails);
        return order
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchOrdersByUserIdRepository(userId) {
    try {
        const orders = await Order.find({
            user: userId
        }).populate('items.product')
        return orders
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function fetchOrderByIdRepository(orderId) {
    try {
        const order = await Order.findById(orderId).populate('items.product')
        return order
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function updateOrderStatusRepo(orderId, status) {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: status }, {new: true})
        return updatedOrder
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    createOrderRepository,
    fetchOrderByIdRepository,
    fetchOrdersByUserIdRepository,
    updateOrderStatusRepo
}