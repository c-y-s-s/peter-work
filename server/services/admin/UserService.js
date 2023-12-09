const UserModal = require("../../models/useModal");
const ProductModal = require("../../models/productModal");
const UserService = {
  login: async ({ account, password }) => {
    // 邏輯
    return UserModal.findOne({
      account,
      password,
    });
  },
};

module.exports = UserService;
