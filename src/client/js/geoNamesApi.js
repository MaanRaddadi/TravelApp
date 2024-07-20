function callGeoNamesApi(location, userName) {
  let url = `https://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${userName}`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response.geonames[0];
    });
}

export { callGeoNamesApi };
