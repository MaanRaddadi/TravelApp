const dotenv = require("dotenv");
const fetch = require('node-fetch');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

dotenv.config();

async function callGeoNamesApi(req, res) {
  console.log(req.body.city);
  let userName = process.env.user_Name;

  let url = `http://api.geonames.org/searchJSON?q=${req.body.city}&maxRows=10&username=${userName}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}

exports.callGeoNamesApi = callGeoNamesApi;
