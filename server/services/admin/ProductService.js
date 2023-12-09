const ProductModal = require("../../models/productModal");
const ProductService = {
  upload: async ({ _id, name, introduce, amount, price, productImg }) => {
    return ProductModal.create({
      name,
      introduce,
      amount,
      price,
      productImg,
      status: true,
    });
  },
  productList: async () => {
    return await ProductModal.find();
  },
  productUpdate: async (id, updateData) => {
    return await ProductModal.findByIdAndUpdate(id, updateData, { new: true });
  },
  productDelete: async (id) => {
    return ProductModal.deleteOne({ _id: id });
  },
};

module.exports = ProductService;
