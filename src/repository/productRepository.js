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

module.exports = {
    createProductRepository
}