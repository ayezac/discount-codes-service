const { users } = require("../data/mockData");

const isInvalidUser = (context) => {
  const userid = context.params.headers.userid;
  const userIds = users.map((b) => b._id);
  const isInvalidUser = userIds.indexOf(userid) === -1;

  return isInvalidUser;
};

module.exports = isInvalidUser;
