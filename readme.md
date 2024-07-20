# Travel App Project

## Setup

To get the project up and running follow the steps below:

To run in development mode
To start the webpack dev server at port 3000

```bash
  npm run build-dev
```

#### To run in production mode

```bash
  npm run build-prod
```

The above step will generate a dist folder with all the files required to run the client side and then start server at port 8000 using the command given below.

```bash
  npm run start
```

## Configs

Here, we have two separate webpack config files for both development mode(`webpack.config.dev.js`) and production mode(`webpack.config.prod.js `)

All the scripts and dependencies are listed in the ` package.json` file.

Note: to get the data from the API, you will need to create a `.env `file which will store all the URLs and API keys of the used APIs.

## API

used following APIs:

- [Weatherbit](https://www.weatherbit.io/api/) for getting the weather information
- [GeoNames](https://www.geonames.org/export/web-services.html) for getting the latitude and longitude information
- [Pixabay](https://pixabay.com/api/docs/) for getting the images of the place.

## Testing

The testing is done using Jest. To run test, enter the command

`npm run test`
