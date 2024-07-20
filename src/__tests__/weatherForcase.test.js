const requestPost = require("../server/weatherForecastApi");
const handleWeatherForecastRequest = requestPost.callWeatherForecastApi;

const httpMocks = require("node-mocks-http");

describe('Test, the function "handleWeatherForecastRequest()" should exist', () => {
  test("It should return true", async () => {
    expect(handleWeatherForecastRequest).toBeDefined();
  });
});

describe('Test "handleWeatherForecastRequest()" should be a function', () => {
  test("It should be a function", async () => {
    expect(typeof handleWeatherForecastRequest).toBe("function");
  });
});

describe('Test, the function "handleWeatherForecastRequest()" returns 200 if a valid url is being provided', () => {
  test("handleWeatherForecastRequest should send a 200 error if user inputs correctly", () => {
    const req = httpMocks.createRequest({
      body: {
        latitude: "51.952659",
        longitude: "7.632473",
      },
    });
    const res = httpMocks.createResponse();
    handleWeatherForecastRequest(req, res);
    // validate HTTP result
    expect(res.statusCode).toBe(200);
  });
});
