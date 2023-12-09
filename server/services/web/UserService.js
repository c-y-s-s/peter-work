const customerModal = require("../../models/customerModal");

const UserService = {
  login: async ({ account, password }) => {
    // 邏輯
    return customerModal.findOne({
      account,
      password,
    });
  },
  register: async ({ name, account, password }) => {
    const user = new customerModal({
      name,
      account,
      password,
    });
    await user.save();
    return user;
  },
};

module.exports = UserService;
