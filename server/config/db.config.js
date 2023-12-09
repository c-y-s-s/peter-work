const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://localhost:27017/company-system");
  const db = mongoose.connection;

  ///與資料庫連線發生錯誤時
  db.on("err", (err) => console.log("連接資料庫失敗"));

  ///與資料庫連線成功連線時
  db.once("open", () => console.log("連接資料庫成功"));
};
