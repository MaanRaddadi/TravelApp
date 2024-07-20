const request = require("supertest");
const app = require("../server/server.js");

describe("GET /", () => {
  it("should respond with the index.html file", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toBe("text/html; charset=UTF-8");
  });
});

describe("GET /test", () => {
  it('should respond with "Hello, World!"', async () => {
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, World!");
  });
});
