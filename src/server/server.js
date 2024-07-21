var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const { callGeoNamesApi } = require("./geoNamesApi");
const { callCurrentWeatherApi } = require("./currentWeatherApi");
const { callWeatherForecastApi } = require("./weatherForecastApi");
const { getLocationImage } = require("./getLocationImage");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function (req, res) {
  res.send("Hello, World!");
});

app.listen(8000, function () {
  console.log("Travel app listening on port 8000!");
});

app.post("/coordinates", callGeoNamesApi);

app.post("/currentWeather", callCurrentWeatherApi);

app.post("/weatherForecast", callWeatherForecastApi);

app.post("/getLocationImage", getLocationImage);

module.exports = app;
