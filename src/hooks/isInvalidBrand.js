const { brands } = require("../data/mockData");

const isInvalidBrand = (context) => {
  const brandId = context.data.brand;
  const brandIds = brands.map((b) => b._id);
  return brandIds.indexOf(brandId) === -1;
};

module.exports = isInvalidBrand;
