const cloudinary = require("../config/cloudinaryConfig");
const fs = require('fs/promises');
const { createProductRepository, fetchProductsRepository, fetchProductByIdRepository, deleteProductRepository } = require("../repository/productRepository");

async function createProductService(productDetails, file) {
    
    if(!file) {
        throw {message: "Coudn't find file", statusCode: 404}
    }

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(file.path)
    fs.unlink(file.path) // Remove local file after upload

    // Append Cloudinary secure_url to productDetails

    productDetails.image = result.secure_url;
    productDetails.imagePublicId = result.public_id;

    // Save product in db
    return await createProductRepository(productDetails)

}

async function fetchProductsService() {
    return await fetchProductsRepository();
}

async function fetchProductByIdService(productId) {
    return await fetchProductByIdRepository(productId);
}

async function deleteProductService(productId) {
    const product = await fetchProductByIdRepository(productId);

    if(!product) {
        throw { message: "Product not found", statusCode: 404}
    }

    // Delete from cloudinary
    if(product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId)
    }

    // Delete from DB
    await deleteProductRepository(productId);

    return product;
}

module.exports = {
    createProductService,
    fetchProductsService,
    fetchProductByIdService,
    deleteProductService
}