const { BadRequest } = require("@feathersjs/errors");
const { isAfter } = require("date-fns");

const isDiscountCodeAvailable = async (context) => {
  const { id } = context;
  const discountCode = await context.app.service("discount-codes")._get(id);
  const expiresOn = discountCode.expiresOn;
  const isExpired = expiresOn
    ? isAfter(Date.now(), new Date(discountCode.expiresOn))
    : false;
  const isAvailable =
    discountCode.numberOfDiscounts > discountCode.accessedBy.length;

  if (isExpired) {
    throw new BadRequest("Discount code has expired");
  }
  if (!isAvailable) {
    throw new BadRequest("Discount code is no longer available");
  }
};

module.exports = isDiscountCodeAvailable;
