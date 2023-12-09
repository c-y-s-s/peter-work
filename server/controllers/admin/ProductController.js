const JWT = require("../../utils/JWT");
const ProductService = require("../../services/admin/ProductService");
const ProductController = {
  upload: async (req, res) => {
    const { introduce, amount, price, name } = req.body;
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    const productImg = `avataruploads/${req.file.filename}`;
    const payload = JWT.verify(token);

    await ProductService.upload({
      _id: payload._id,
      name,
      introduce,
      amount,
      price,
      productImg,
    });

    res.send({
      code: "0",
    });
  },
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
  productUpdate: async (req, res) => {
    try {
      const { id } = req.params; // 從 URL 獲取 ID
      const updateData = req.body; // 從請求的 body 中獲取更新的數據

      const updatedItem = await ProductService.productUpdate(id, updateData);

      res.send({
        status_code: "200",
        message: "update success",
        data: updatedItem,
      });
    } catch (error) {
      res.status(500).json({ code: "-1", message: "server error" });
    }
  },
  productDelete: async (req, res) => {
    try {
      const { id } = req.params; // 從 URL 獲取 ID

      const result = await ProductService.productDelete(id);

      res.send({
        code: "0",
        message: "delete success",
      });
    } catch (error) {
      res.status(500).json({ code: "-1", message: "server error" });
    }
  },
};

module.exports = ProductController;
