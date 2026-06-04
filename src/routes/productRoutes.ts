import express from "express";

import {
  createProduct,
  fetchAllProduct,
  fetchSingleProduct,
  deleteProduct,
  updateProduct,
} from "../controller/productController";

import {
  isLoggedIn,
  isAdmin,
} from "../validation/authValidator";

import upload from "../config/cloudinaryConfig";

const productRouter =
  express.Router();

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.single("image"),
  createProduct
);

productRouter.get(
  "/",
  isLoggedIn,
  fetchAllProduct
);

productRouter.get(
  "/:productId",
  isLoggedIn,
  fetchSingleProduct
);

productRouter.put(
  "/:productId",
  upload.single("image"),
  isLoggedIn,
  updateProduct
);

productRouter.delete(
  "/:productId",
  isLoggedIn,
  deleteProduct
);

export default productRouter;