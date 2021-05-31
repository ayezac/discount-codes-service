// Initializes the `discount-codes` service on path `/discount-codes`
const { DiscountCodes } = require("./discount-codes.class");
const createModel = require("../../models/discount-codes.model");
const hooks = require("./discount-codes.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/discount-codes", new DiscountCodes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("discount-codes");

  service.hooks(hooks);
};
