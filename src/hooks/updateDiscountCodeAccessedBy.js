const updateDiscountCodeAccessedBy = async (context) => {
  const { id } = context;
  const { userid } = context.params.headers;
  const discountCode = await context.app.service("discount-codes")._get(id);

  if (!discountCode.accessedBy.includes(userid)) {
    const accessedBy = [...discountCode.accessedBy, userid];
    try {
      await context.app.service("discount-codes").patch(id, {
        accessedBy: accessedBy,
      });
    } catch (err) {
      throw err;
    }
  }
};

module.exports = updateDiscountCodeAccessedBy;
