const express = require("express");
const { createProduct } = require("../controller/productController");
const { isLoggedIn } = require("../validation/authValidator");
const uploader = require("../middlewares/multerMiddleware");

const productRouter = express.Router();

productRouter.post('/', uploader.single("incomingFile"), isLoggedIn, createProduct);

module.exports = productRouter;