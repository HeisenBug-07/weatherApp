const request = require("postman-request");

// function to fetxh data from weatherstack api
const forecast = function (lat, lng, callback) {
  request(
    {
      url: `http://api.weatherstack.com/current?access_key=e650895291f116d94a51ca875f048285&query=${encodeURIComponent(
        lat,
      )},${encodeURIComponent(lng)}&units=m`,
      json: true,
    },
    (error, response) => {
      // system error
      if (error)
        callback(
          { error: "SYSTEM ERROR !!! can't reach weather server! try again" },
          undefined,
        );
      // server error
      else if (response.body.error)
        callback({ error: response.body.error }, undefined);
      // sucessfull request
      else
        callback(undefined, {
          temperature: response.body.current.temperature,
          description: response.body.current.weather_descriptions[0],
        });
    },
  );
};

module.exports = forecast;
