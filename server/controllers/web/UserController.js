const customerModal = require("../../models/customerModal");
const UserService = require("../../services/web/UserService");
const JWT = require("../../utils/JWT");
const bcrypt = require("bcrypt");

const UserController = {
  login: async (req, res) => {
    // req.body 前端傳來的資料
    const { account, password } = req.body;

    try {
      // 根据用户名或邮箱查找用户
      const user = await customerModal.findOne({ account });

      if (!user) {
        return res.status(400).send("用户不存在");
      }

      // 比较密码

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("密码错误");
      }

      // 密码匹配，处理登录逻辑
      // 例如：生成JWT令牌、设置会话等

      const token = JWT.generate(
        {
          _id: user._id,
          account: user.account,
        },
        "6h"
      );

      res.header("Access-Control-Expose-Headers", "Authorization");
      res.header("Authorization", token);
      res.send({
        code: "0",
        success_msg: "ok",
        data: {
          account: user.account,
          name: user.account,
          id: user._id,
          token,
        },
      });
    } catch (error) {
      res.status(500).send("登录过程中发生错误");
    }
  },
  register: async (req, res) => {
    const result = await UserService.register(req.body);

    //返回前端
    if (!result) {
      res.send({
        code: "-1",
        error_msg: "註冊失敗",
      });
    } else {
      res.send({
        code: "0",
        success_msg: "註冊成功",
      });
    }
  },
};

module.exports = UserController;
