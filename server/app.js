var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");

// var usersRouter = require("./routes/users");
const UserRouter = require("./routes/admin/userRouter");
const ProductRouter = require("./routes/admin/productRouter");
const OrderRouter = require("./routes/admin/orderRouter");
const TokenRouter = require("./routes/admin/validateTokenRouter");

const WebProductRouter = require("./routes/web/productRouter");
const WebUserRouter = require("./routes/web/userRouter");
const WebOrderRouter = require("./routes/web/orderRouter");

const JWT = require("./utils/JWT");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(TokenRouter);
app.use(WebProductRouter);
app.use(WebUserRouter);
app.use((req, res, next) => {
  if (req.url === "/adminapi/user/login") {
    next();
    return;
  }

  if (req.url === "/web/user/login") {
    next();
    return;
  }

  //獲取 token
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    let payload = JWT.verify(token);

    if (!payload) {
      return res.status(401).send({
        code: "999",
        errorMsg: "token 過期",
      });
    } else {
      const newToken = JWT.generate(
        {
          _id: payload._id,
          account: payload.account,
          time: new Date().getTime(),
        },
        "6h"
      );

      res.header("Access-Control-Expose-Headers", "Authorization");
      res.header("Authorization", newToken);

      next();
    }
  } else {
    return res.status(403).send("A token is required for authentication");
  }
});
app.use(WebOrderRouter);

app.use(UserRouter);
app.use(ProductRouter);
app.use(OrderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("d");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
