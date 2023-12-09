const OrderService = require("../../services/web/OrderService");
const OrderController = {
  checkout: async (req, res) => {
    console.log(req.body);
    try {
      await OrderService.orderCreate(req.body);
      // 使用 Mongoose 的 find 方法获取所有产品
      res.send({
        code: "0",
        message: "checkout success",
      });
    } catch (err) {
      res.status(500).json({ code: "-1", message: "server error" });
    }
  },
  orderList: async (req, res) => {
    try {
      const orderList = await OrderService.getOrderList(req.body);
      // 使用 Mongoose 的 find 方法获取所有产品
      res.send({
        code: "0",
        message: "checkout success",
        data: orderList,
      });
    } catch (err) {
      res.status(500).json({ code: "-1", message: "server error" });
    }
  },
};

module.exports = OrderController;
