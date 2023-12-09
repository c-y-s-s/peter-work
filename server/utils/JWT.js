const jsonwebtoken = require("jsonwebtoken");
const { set } = require("../app");
const secret = "cakecake";
const JWT = {
  generate(value, expires) {
    return jsonwebtoken.sign(value, secret, { expiresIn: expires });
  },
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret);
    } catch (error) {
      return false;
    }
  },
};

module.exports = JWT;
