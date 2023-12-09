var express = require("express");
const UserController = require("../../controllers/web/UserController");
var UserRouter = express.Router();

/* GET home page. */
UserRouter.post("/web/user/login", UserController.login);

UserRouter.post("/web/user/register", UserController.register);

module.exports = UserRouter;
