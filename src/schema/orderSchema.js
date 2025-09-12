const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["ORDERED", "CANCELLED", "DELIVERED", "PROCESSING", "OUT_FOR_DELIVERY"],
        default: "ORDERED"
    },

    address: {
        type: String,
        minLength: [10, "Address should be of atleast 10 characters"]
    },

    paymentMethod: {
        type: String,
        enum: ["ONLINE", "CASH"],
        default: "CASH"
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;