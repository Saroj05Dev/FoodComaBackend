const { createProductService } = require("../service/productService");

async function createProduct(req, res) {
    try {
        const productDetails = req.body;
        const file = req.file;

        const newProduct = await createProductService(productDetails, file);

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct,
            error: {}
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
            data: {},
            error: error
        })
    }
}

module.exports = {
    createProduct
}