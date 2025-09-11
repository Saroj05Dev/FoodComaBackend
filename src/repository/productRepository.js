const Product = require("../schema/productSchema");

async function createProductRepository(productDetails) {
    try {
        const product = await Product.create(productDetails);
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchProductsRepository() {
    try {
        const product = await Product.find();
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchProductByIdRepository(productId) {
    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateProductRepository(productId, updatedData) {
    try {
        const deletedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
            new: true,
            runValidators: true
        });
        return deletedProduct;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteProductRepository(productId) {
    try {
        const product = await Product.findByIdAndDelete(productId);
        return product;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createProductRepository,
    fetchProductsRepository,
    fetchProductByIdRepository,
    deleteProductRepository,
    updateProductRepository
}