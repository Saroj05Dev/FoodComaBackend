const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Product title is required"],
        minLength: [7, "The title of product must be atleast 7 characters long"],
        maxLength: [21, "The title of product must be atmost 21 characters long"],
    },

    description: {
        type: String,
        trim: true,
        required: [true, "Product title is required"],
        minLength: [14, "The title of product must be atleast 14 characters long"],
        maxLength: [42, "The title of product must be atmost 42 characters long"],
    },

    category: {
        type: String,
        enum: ["Veg", "Non-Veg", "Drinks", "Sides"],
        default: "Veg"
    },

    image: {
        type: String,
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