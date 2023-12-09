const JWT = require("../../utils/JWT");
const OrderService = require("../../services/admin/OrderService");
const OrderModal = require("../../models/orderModal");

const OrderController = {
  orderList: async (req, res) => {
    try {
      const orderList = await OrderService.orderList();

      // 使用 Mongoose 的 find 方法获取所有产品
      res.send({
        code: "0",
        data: orderList,
      });
    } catch (err) {
      res.status(500).json({ code: "-1", message: "server error" });
    }
  },
  orderUpdate: async (req, res) => {
    try {
      const { id } = req.params; // 從 URL 獲取 ID
      const status = req.body; // 從請求的 body 中獲取更新的數據

      const updatedItem = await OrderService.orderUpdate(id, status);

      res.send({
        status_code: "200",
        message: "update success",
        data: updatedItem,
      });
    } catch (error) {
      res.status(500).json({ code: "-1", message: error.message });
    }
  },
  orderDelete: async (req, res) => {
    try {
      const { id } = req.params; // 從 URL 獲取 ID
      const result = await OrderService.orderDelete(id);

      res.send({
        code: "0",
        message: "delete success",
      });
    } catch (error) {
      res.status(500).json({ code: "-1", message: "server error" });
    }
  },
};

module.exports = OrderController;
