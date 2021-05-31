const {
  required,
  iff,
  disallow,
  isProvider,
} = require("feathers-hooks-common");
const authentication = require("@feathersjs/authentication");

const isInvalidBrand = require("../../hooks/isInvalidBrand");
const isInvalidUser = require("../../hooks/isInvalidUser");
const isDiscountCodeAvailable = require("../../hooks/isDiscountAvailable");
const updateDiscountCodeAccessedBy = require("../../hooks/updateDiscountCodeAccessedBy");
const validateData = require("../../hooks/validateData");
const notifyBrand = require("../../hooks/notifyBrand");
const allowApiKey = require("../../hooks/allowApiKey");
const { authenticate } = authentication.hooks;

const setAccessedBy = (context) => {
  if (!context.data.accessedBy) {
    context.data = {
      ...context.data,
      accessedBy: [],
    };
    return context;
  }
};

module.exports = {
  before: {
    all: [iff(isProvider("external"), allowApiKey(), authenticate("apiKey"))],
    find: [],
    get: [
      iff(isInvalidUser, disallow()),
      isDiscountCodeAvailable,
      updateDiscountCodeAccessedBy,
    ],
    create: [
      required(
        "method",
        "discountAmount",
        "codeId",
        "title",
        "description",
        "brand",
        "numberOfDiscounts"
      ),
      setAccessedBy,
      validateData,
      iff(isInvalidBrand, disallow()),
    ],
    update: [disallow()],
    patch: [disallow("external")],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [notifyBrand],
    create: [],
    update: [disallow()],
    patch: [disallow("external")],
    remove: [disallow()],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
