const ProductService = require("../../services/web/ProductService");
const ProductController = {
  productList: async (req, res) => {
    try {
      const productsList = await ProductService.productList();
      // 使用 Mongoose 的 find 方法获取所有产品
      res.send({
        code: "0",
        data: productsList,
      });
    } catch (err) {
      res.status(500).json({ code: "-1", message: "server error" });
    }
  },
};

module.exports = ProductController;
