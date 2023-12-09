var express = require("express");
const ProductController = require("../../controllers/admin/ProductController");
var ProductRouter = express.Router();

// 圖片上傳模組
const multer = require("multer");
const upload = multer({ dest: "public/avataruploads/" });

ProductRouter.post(
  "/adminapi/product/upload",
  upload.single("imgFile"),
  ProductController.upload
);

ProductRouter.get("/adminapi/product/list", ProductController.productList);

ProductRouter.put(
  "/adminapi/product/list/:id",
  ProductController.productUpdate
);

ProductRouter.delete(
  "/adminapi/product/list/:id",
  ProductController.productDelete
);

module.exports = ProductRouter;
