const express = require("express");
const AuthController = require("../apps/controllers/Auth");
const ProductController = require("../apps/controllers/Products");
const CommentController = require("../apps/controllers/Comment");
const CategoryController = require("../apps/controllers/Category");
const AuthMiddleware = require("../apps/middlewares/Auth");
const UploadMiddleware = require("../apps/middlewares/Upload");
const router = express.Router();

// Auth
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.login);

// Product GET request
router.get("/api/products", ProductController.getProducts);
router.get("/api/products/search", ProductController.findProduct);
router.get("/api/product/:id", ProductController.getById);
// Product POST request
router.post(
  "/api/product/add",
  UploadMiddleware.single("thumbnail"),
  ProductController.addProduct
);
router.post("/api/products/:id/comments", CommentController.postComment);
// Product DELETE request
router.delete("/api/product/delete/:id", ProductController.delProduct);

//Category
router.get("/api/categories", CategoryController.getCategory);
router.get(
  "/api/categories/:id/products",
  CategoryController.getCategoryProducts
);
router.get("/api/categories/:id", CategoryController.getCategoryById);
module.exports = router;
