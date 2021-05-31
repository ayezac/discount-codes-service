const { BadRequest } = require("@feathersjs/errors");

const validateData = (context) => {
  const { method } = context.data;
  const methodEnums = ["percent_discount", "fixed_amount"];
  if (typeof method !== "string" || !methodEnums.includes(method)) {
    throw new BadRequest("Invalid discount method");
  }
  const { discountAmount } = context.data;
  if (typeof discountAmount !== "number") {
    throw new BadRequest("Discount amount value needs to be a number");
  }
  if (
    (method === "percent_discount" && discountAmount > 100) ||
    discountAmount <= 0
  ) {
    throw new BadRequest("Discount percentage cannot be greater than 100");
  }
};

module.exports = validateData;
