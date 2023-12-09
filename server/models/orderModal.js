const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductDataSchema = new Schema({
  amount: String,
  product_id: String,
});

// 更新 Order 模型的结构
const OrderSchema = new Schema({
  created_date: Number, // 使用 Number 类型来存储时间戳
  status: String,
  user_id: String,
  product_data: [ProductDataSchema], // product_data 是一个包含多个 ProductDataSchema 的数组
});

const OrderModal = mongoose.model("Order", OrderSchema);

module.exports = OrderModal;
