const app = require("../app");

const request = require("supertest");

describe("Test /hello", () => {
  it("should return world!", (done) => {
    request(app)
      .get("/hello")
      .then((response) => {
        expect(response.text).toBe("world");
        done();
      });
  });
});

describe("Test ");
