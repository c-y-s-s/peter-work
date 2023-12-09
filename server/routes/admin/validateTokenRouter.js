var express = require("express");
var TokenRouter = express.Router();

const JWT = require("../../utils/JWT");

TokenRouter.get("/api/validate-token", (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ code: "999", message: "No token provided" });
  } else {
    let payload = JWT.verify(token);

    if (!payload) {
      return res.status(401).send({
        code: "999",
        errorMsg: "token 過期",
      });
    } else {
      res.status(200).json({ code: "0", message: "Token is valid" });
    }
  }
});

module.exports = TokenRouter;
