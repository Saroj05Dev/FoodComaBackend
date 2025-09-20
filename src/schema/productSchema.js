const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Product title is required"],
    },

    description: {
        type: String,
        trim: true,
        required: [true, "Product title is required"],
    },

    category: {
        type: String,
        enum: ["Veg", "Non-Veg", "Drinks", "Sides"],
        default: "Veg"
    },

    image: {
        type: String,
    },

    quantity: {
        type: Number,
        required: true,
        default: 10
    },

    imagePublicId: {
        type: String
    },

    price: {
       type: Number,
       required: [true, "Product price is required"],
    },

    inStock: {
        type: Boolean,
        required: [true, "In stock status is required"]
    }
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;