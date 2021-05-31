module.exports = function (options = {}) {
  return async (context) => {
    const { params } = context;

    const token = params.headers["x-access-token"];

    if (token && params.provider && !params.authentication) {
      context.params = {
        ...params,
        authentication: {
          strategy: "apiKey",
          token,
        },
      };
    }

    return context;
  };
};
