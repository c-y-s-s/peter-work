const ProductModal = require("../../models/productModal");
const ProductService = {
  productList: async () => {
    return await ProductModal.find({ status: { $ne: 0 } });
  },
};

module.exports = ProductService;
