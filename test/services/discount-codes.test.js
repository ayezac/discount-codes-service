const assert = require("assert");
const app = require("../../src/app");

describe("'discount-codes' service", () => {
  it("registered the service", () => {
    const service = app.service("discount-codes");
    assert.ok(service, "Registered the service");
  });

  it("does not create without all required fields", async () => {
    const service = app.service("discount-codes");
    const newDiscountCode = {
      title: "Get 50% off all online purchases",
      codeId: "SPRING2021",
      description: "Use this code to get 50% off of all purchases ",
      brand: "nkjf6389aj",
      numberOfDiscounts: 10,
      accessedBy: [],
      expiresOn: "2021-12-31",
    };

    await assert.rejects(
      async () => {
        await service.create(newDiscountCode);
      },
      (err) => {
        assert.strictEqual(err.name, "BadRequest");

        return true;
      }
    );
  });

  it("does not create if discountAmount is invalid", async () => {
    const service = app.service("discount-codes");
    const newDiscountCode = {
      title: "Get 50% off all online purchases",
      method: "percent_discount",
      discountAmount: 150,
      codeId: "SPRING2021",
      description: "Use this code to get 50% off of all purchases ",
      brand: "nkjf6389aj",
      numberOfDiscounts: 10,
      accessedBy: [],
      expiresOn: "2021-12-31",
    };

    await assert.rejects(
      async () => {
        await service.create(newDiscountCode);
      },
      (err) => {
        assert.strictEqual(err.name, "BadRequest");

        return true;
      }
    );
  });

  it("does not create if method is invalid", async () => {
    const service = app.service("discount-codes");
    const newDiscountCode = {
      title: "Get 50% off all online purchases",
      method: "free",
      discountAmount: 50,
      codeId: "SPRING2021",
      description: "Use this code to get 50% off of all purchases ",
      brand: "nkjf6389aj",
      numberOfDiscounts: 10,
      accessedBy: [],
      expiresOn: "2021-12-31",
    };

    await assert.rejects(
      async () => {
        await service.create(newDiscountCode);
      },
      (err) => {
        assert.strictEqual(err.name, "BadRequest");

        return true;
      }
    );
  });

  it("does not create if invalid brand", async () => {
    const service = app.service("discount-codes");
    const newDiscountCode = {
      title: "Get 50% off all online purchases",
      discountAmount: 50,
      method: "percent_discount",
      codeId: "SPRING2021",
      description: "Use this code to get 50% off of all purchases ",
      brand: "nkj89aj",
      numberOfDiscounts: 10,
      accessedBy: [],
      expiresOn: "2021-12-31",
    };

    await assert.rejects(
      async () => {
        await service.create(newDiscountCode);
      },
      (err) => {
        assert.strictEqual(err.name, "MethodNotAllowed");

        return true;
      }
    );
  });

  it("does not fetch a discount code if user is invalid", async () => {
    const params = {
      headers: {
        userid: "yfas",
      },
    };
    const service = app.service("discount-codes");
    const res = await service.create(
      {
        title: "Get 50% off all online purchases",
        method: "percent_discount",
        discountAmount: 50,
        codeId: "SPRING2021",
        description: "Use this code to get 50% off of all purchases ",
        brand: "nkjf6389ajlrh",
        numberOfDiscounts: 10,
        accessedBy: [],
        expiresOn: "2021-12-31",
      },
      params
    );

    await assert.rejects(
      async () => {
        await service.get(res._id, params);
      },
      (err) => {
        assert.strictEqual(err.name, "MethodNotAllowed");

        return true;
      }
    );
  });

  it("does not fetch a discount code if discount has expired", async () => {
    const params = {
      headers: {
        userid: "098fbnha567vj",
      },
    };
    const service = app.service("discount-codes");
    const res = await service.create(
      {
        title: "Get 50% off all online purchases",
        method: "percent_discount",
        discountAmount: 50,
        codeId: "SPRING2021",
        description: "Use this code to get 50% off of all purchases ",
        brand: "nkjf6389ajlrh",
        numberOfDiscounts: 10,
        accessedBy: [],
        expiresOn: "2021-05-01",
      },
      params
    );

    await assert.rejects(
      async () => {
        await service.get(res._id, params);
      },
      (err) => {
        assert.strictEqual(err.name, "BadRequest");
        assert.strictEqual(err.message, "Discount code has expired");

        return true;
      }
    );
  });

  it("does not fetch a discount code if none are available", async () => {
    const params = {
      headers: {
        userid: "098fbnha567vj",
      },
    };
    const service = app.service("discount-codes");
    const res = await service.create(
      {
        title: "Get 50% off all online purchases",
        method: "percent_discount",
        discountAmount: 50,
        codeId: "SPRING2021",
        description: "Use this code to get 50% off of all purchases ",
        brand: "nkjf6389ajlrh",
        numberOfDiscounts: 2,
        accessedBy: ["qwerq13", "asdf565"],
        expiresOn: "2021-12-31",
      },
      params
    );

    await assert.rejects(
      async () => {
        await service.get(res._id, params);
      },
      (err) => {
        assert.strictEqual(err.name, "BadRequest");
        assert.strictEqual(err.message, "Discount code is no longer available");

        return true;
      }
    );
  });

  it("updates accessedBy field when user fetches a discount code", async () => {
    const params = {
      headers: {
        userid: "098fbnha567vj",
      },
    };
    const service = app.service("discount-codes");
    const code = await service.create(
      {
        title: "Get 50% off all online purchases",
        method: "percent_discount",
        discountAmount: 50,
        codeId: "SPRING2021",
        description: "Use this code to get 50% off of all purchases ",
        brand: "nkjf6389ajlrh",
        numberOfDiscounts: 20,
        accessedBy: ["qwerq13", "asdf565"],
        expiresOn: "2021-12-31",
      },
      params
    );
    const res = await service.get(code._id, params);

    assert.ok(res.accessedBy.length === 3);
    assert.ok(res.accessedBy.includes("098fbnha567vj") === true);
  });
});
