const { createProductService, fetchProductsService, fetchProductByIdService, deleteProductService } = require("../service/productService");

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

async function fetchAllProduct(req, res) {
    try {
        
        const products = await fetchProductsService();

        return res.status(201).json({
            success: true,
            message: "Product fetched successfully",
            data: products,
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

async function fetchSingleProduct(req, res) {
    try {
        const { productId } = req.params;
        const product = await fetchProductByIdService(productId);

        return res.status(201).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
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

async function deleteProduct(req, res) {
    try {
        const { productId } = req.params;
        const deletedProduct = await deleteProductService(productId);

        return res.status(201).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct,
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
    createProduct,
    fetchAllProduct,
    fetchSingleProduct,
    deleteProduct
}