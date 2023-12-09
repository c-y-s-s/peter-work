const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const customerSchema = new Schema({
  account: String,
  password: String,
  name: String,
});

// 密码加密中间件
customerSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const customerModal = mongoose.model("customer", customerSchema);
module.exports = customerModal;
