const cloudinary = require("../config/cloudinaryConfig");
const fs = require('fs/promises');
const { createProductRepository } = require("../repository/productRepository");

async function createProductService(productDetails, file) {
    
    if(!file) {
        throw {message: "Coudn't find file", statusCode: 404}
    }

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(file.path)
    fs.unlink(file.path) // Remove local file after upload

    // Append Cloudinary secure_url to productDetails

    productDetails.image = result.secure_url;

    // Save product in db
    return await createProductRepository(productDetails)

}

module.exports = {
    createProductService
}