const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductType = {
  name: String,
  introduce: String,
  amount: Number,
  price: String,
  productImg: String,
  status: Boolean,
};

const ProductModal = mongoose.model("product", new Schema(ProductType));
module.exports = ProductModal;
