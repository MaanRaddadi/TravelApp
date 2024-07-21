const dotenv = require("dotenv");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const fetch = require("node-fetch");
dotenv.config();

async function callCurrentWeatherApi(req, res) {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const url = `http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.Weatherbit_key}`;
  try {
    const currentWeatherData = await fetch(url);
    const data = await currentWeatherData.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}

exports.callCurrentWeatherApi = callCurrentWeatherApi;
