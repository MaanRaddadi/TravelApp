const fetch = require("node-fetch");
async function callWeatherForecastApi(req, res) {
  const lat = req.body.lat;
  const lng = req.body.lng;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.Weatherbit_key}&hours=${req.body.hours}`;
  try {
    const weatherData = await fetch(url);
    const data = await weatherData.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}

exports.callWeatherForecastApi = callWeatherForecastApi;
