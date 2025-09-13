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

module.exports = {
    createOrderRepository
}