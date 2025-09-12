const express = require("express");
const { createProduct, fetchAllProduct, fetchSingleProduct, deleteProduct, updateProduct } = require("../controller/productController");
const { isLoggedIn, isAdmin } = require("../validation/authValidator");
const uploader = require("../middlewares/multerMiddleware");

const productRouter = express.Router();

productRouter.post('/', isLoggedIn, isAdmin, uploader.single("image"), createProduct);
productRouter.get('/', isLoggedIn, fetchAllProduct);
productRouter.get('/:productId', isLoggedIn, fetchSingleProduct);
productRouter.put('/:productId', uploader.single("image"), isLoggedIn, updateProduct);
productRouter.delete('/:productId', isLoggedIn, deleteProduct);

module.exports = productRouter;