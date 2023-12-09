var express = require("express");
const ProductController = require("../../controllers/web/ProductController");
var ProductRouter = express.Router();

ProductRouter.get("/web/product/list", ProductController.productList);

module.exports = ProductRouter;
