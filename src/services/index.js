const discountCodes = require("./discount-codes/discount-codes.service.js");
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(discountCodes);
};
