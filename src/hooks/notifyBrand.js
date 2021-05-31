const notifyBrand = async (context) => {
  const { userid } = context.params.headers;
  const createdDiscountCode = context.result;
  //Add functionality to notify brand about user getting a discount code;
  console.log(
    `User ${userid} has fetched discount code ${createdDiscountCode.codeId}`
  );
};

module.exports = notifyBrand;
