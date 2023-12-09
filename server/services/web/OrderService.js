const OrderModal = require("../../models/orderModal");
const OrderService = {
  orderCreate: async ({ created_date, user_id, product_data }) => {
    return await OrderModal.create({
      created_date,
      user_id,
      status: 0,
      product_data,
    });
  },
  getOrderList: async ({ user_id }) => {
    const orders = await OrderModal.aggregate([
      {
        $match: {
          user_id: user_id, // 这里添加 $match 阶段来筛选 user_id
        },
      },
      {
        $unwind: "$product_data",
      },
      {
        $addFields: {
          "product_data.product_id": {
            $toObjectId: "$product_data.product_id",
          },
          converted_user_id: { $toObjectId: "$user_id" }, // 將 user_id 轉換為 ObjectId
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_data.product_id",
          foreignField: "_id",
          as: "product_data.product_details",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "converted_user_id", // 使用轉換後的 user_id 進行匹配
          foreignField: "_id",
          as: "user_details",
        },
      },
      {
        $unwind: {
          path: "$product_data.product_details",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$user_details",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          created_date: { $first: "$created_date" },
          status: { $first: "$status" },
          user_id: { $first: "$user_id" },
          user_details: { $first: "$user_details" },
          product_data: { $push: "$product_data" },
        },
      },
      {
        $project: {
          "user_details.password": 0, // 排除 password 欄位
          // 在這裡您可以指定其他需要包含或排除的欄位
        },
      },
    ]);
    return orders;
  },
};

module.exports = OrderService;
