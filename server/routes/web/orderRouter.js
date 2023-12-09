var express = require("express");
const OrderController = require("../../controllers/web/OrderController");
var OrderRouter = express.Router();

OrderRouter.post("/web/order/checkout", OrderController.checkout);

OrderRouter.post("/web/order/member", OrderController.orderList);

module.exports = OrderRouter;
