const express = require("express");
const { createProduct, fetchAllProduct, fetchSingleProduct, deleteProduct } = require("../controller/productController");
const { isLoggedIn } = require("../validation/authValidator");
const uploader = require("../middlewares/multerMiddleware");

const productRouter = express.Router();

productRouter.post('/', uploader.single("image"), isLoggedIn, createProduct);
productRouter.get('/', isLoggedIn, fetchAllProduct);
productRouter.get('/:productId', isLoggedIn, fetchSingleProduct);
productRouter.delete('/:productId', isLoggedIn, deleteProduct);

module.exports = productRouter;