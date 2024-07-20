const submit = document.getElementById("generate");
let dateValue;
if (submit) {
  submit.addEventListener("click", handelSubmit);
}

let serverUrl = "http://localhost:8000";
async function handelSubmit() {
  dateValue = document.getElementById("date").value;
  const cityValue = document.getElementById("city").value;

  if (dateValue == "" || cityValue == "") {
    return;
  }

  const data = await fetch(serverUrl + "/coordinates", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ city: cityValue }),
  });

  const cityData = await data.json();
  const tripData = {
    country: cityData.geonames[0].countryName,
    lat: cityData.geonames[0].lat,
    lng: cityData.geonames[0].lng,
    date: dateValue,
    city: cityValue,
  };
  let weatherData = [];
  if (isTripWithinWeek(tripData) && !isTripInThePast(tripData)) {
    weatherData = await getCurrentWeather(tripData);
  } else if (!isTripInThePast(tripData)) {
    weatherData = await getWeatherForeCast(tripData);
  }

  console.log(weatherData);

  const locationImage = await getLocationImage(tripData);
  displayTripData(tripData, weatherData, locationImage);
}

function isTripWithinWeek(tripData) {
  const tripDate = new Date(tripData.date);
  const currentDate = new Date();
  const diffTime = Math.abs(tripDate - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 7) {
    return true;
  } else {
    return false;
  }
}
function isTripInThePast(tripData) {
  const tripDate = new Date(tripData.date);
  const currentDate = new Date();
  if (tripDate < currentDate) {
    return true;
  } else {
    return false;
  }
}

async function getCurrentWeather(tripData) {
  const currentWeather = await fetch(serverUrl + "/currentWeather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      lat: tripData.lat,
      lng: tripData.lng,
    }),
  });

  const currentWeatherData = await currentWeather.json();
  return currentWeatherData.data;
}

function countHours(tripData) {
  const tripDate = new Date(tripData.date);
  const currentDate = new Date();
  const diffTime = Math.abs(tripDate - currentDate);
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  return diffHours;
}

async function getWeatherForeCast(tripData) {
  const weatherForecast = await fetch(serverUrl + "/weatherForecast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({
      lat: tripData.lat,
      lng: tripData.lng,
      hours: countHours(tripData),
    }),
  });
  const weatherForecastData = await weatherForecast.json();
  return weatherForecastData.data.slice(0, 5);
}

async function getLocationImage(tripData) {
  const locationImage = await fetch(serverUrl + "/getLocationImage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(tripData),
  });
  const locationImageData = await locationImage.text();
  return locationImageData;
}

function displayTripData(tripData, weatherData, locationImage) {
  const image = document.getElementById("placeImage");
  const countryName = document.getElementById("countryName");
  const cityName = document.getElementById("cityName");
  const weatherTable = document.getElementById("weatherTable");
  const date = document.getElementById("departingDate");

  weatherData.forEach((data) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${data.datetime}</td>
    <td>${data.temp}</td>
    <td>${data.weather.description}</td>
   `;
    weatherTable.appendChild(row);
  });
  date.innerHTML = `Departing : ${tripData.date}`;
  countryName.innerHTML = tripData.country;
  cityName.innerHTML = tripData.city;
  image.src = locationImage;
  window.location.href = "#popup";
}

module.exports =  {
    isTripWithinWeek,
    isTripInThePast,
  }