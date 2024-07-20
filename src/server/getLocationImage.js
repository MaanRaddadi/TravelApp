async function getLocationImage(req, res) {
  const cityUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${req.body.city}&image_type=photo`;
  try {
    const response = await fetch(cityUrl);
    if (response.ok) {
      const data = await response.json();
      if (data.total == 0) {
        const countryUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${req.body.country}&image_type=photo`;
        const countryResponse = await fetch(countryUrl);
        const countryData = await countryResponse.json();
        res.send(countryData.hits[0].webformatURL);
      } else {
        res.send(data.hits[0].webformatURL);
      }
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
}

exports.getLocationImage = getLocationImage;
