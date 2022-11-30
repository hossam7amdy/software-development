const { getAllOrders } = require("./orders.model");

module.exports = {
  Query: {
    orders: () => {
      return getAllOrders();
    },
  },
};
