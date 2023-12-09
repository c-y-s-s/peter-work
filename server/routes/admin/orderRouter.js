var express = require("express");
const OrderController = require("../../controllers/admin/OrderController");

var OrderRouter = express.Router();

OrderRouter.get("/adminapi/order/list", OrderController.orderList);

OrderRouter.put("/adminapi/order/list/:id", OrderController.orderUpdate);

OrderRouter.delete("/adminapi/order/list/:id", OrderController.orderDelete);

module.exports = OrderRouter;
