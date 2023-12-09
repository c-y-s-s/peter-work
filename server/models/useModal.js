const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserType = {
  account: String,
  password: String,
  gender: Number,
  introduction: String,
  avatar: String,
  role: Number, // 角色 管理員1,編輯2
};

//user 模型 ===> users集合
const UserModal = mongoose.model("user", new Schema(UserType));

module.exports = UserModal;
