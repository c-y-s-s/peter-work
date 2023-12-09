const UserService = require("../../services/admin/UserService");
const JWT = require("../../utils/JWT");

const UserController = {
  login: async (req, res) => {
    // req.body 前端傳來的資料

    const result = await UserService.login(req.body);

    //返回前端
    if (!result) {
      res.send({
        code: "-1",
        error_msg: "密碼不匹配",
      });
    } else {
      //密碼帳號正確 生成 token
      const token = JWT.generate(
        {
          _id: result._id,
          account: result.account,
        },
        "6h"
      );
      res.header("Access-Control-Expose-Headers", "Authorization");
      res.header("Authorization", token);
      res.send({
        code: "0",
        success_msg: "ok",
        data: {
          account: result.account,
          name: result.account,
          role: [1],
          token,
        },
      });
    }
  },
};

module.exports = UserController;
