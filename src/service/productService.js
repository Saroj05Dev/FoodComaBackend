const cloudinary = require("../config/cloudinaryConfig");
const fs = require('fs/promises');
const { createProductRepository, fetchProductsRepository, fetchProductByIdRepository, deleteProductRepository, updateProductRepository } = require("../repository/productRepository");

async function createProductService(productDetails, file) {
  if (!file) {
    throw { message: "Couldn't find file", statusCode: 404 };
  }

  // file.path is already Cloudinary URL when using multer-storage-cloudinary
  productDetails.image = file.path;
  productDetails.imagePublicId = file.filename; // public_id comes from CloudinaryStorage

  return await createProductRepository(productDetails);
}

async function fetchProductsService() {
    return await fetchProductsRepository();
}

async function fetchProductByIdService(productId) {
    return await fetchProductByIdRepository(productId);
}

async function updateProductService(productId, updatedData, file) {
    const product = await fetchProductByIdRepository(productId);

    if(!product) {
        throw { message: "Product not found", statusCode: 404 }
    }

    // If new image is uploaded
    if(file) {
        // Delete old image from cloudinary (If available);
        if(product.imagePublicId) {
            await cloudinary.uploader.destroy(product.imagePublicId);
        } else if (product.image) {
            // Fallback if you only stored secure_url
            const publicId = extractPublicIdFromUrl(product.image);
            await cloudinary.uploader.destroy(publicId);
        }
    }

    // Upload new image
    const result = await cloudinary.uploader.upload(file.path);
    await fs.unlink(file.path);

    updatedData.image = result.secure_url;
    updatedData.publicId = result.public_id;

    // Update product in DB
    return await updateProductRepository(productId, updatedData);
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
    deleteProductService,
    updateProductService
}