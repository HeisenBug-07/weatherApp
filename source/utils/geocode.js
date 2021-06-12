const request = require("postman-request");

//function to fetch data from mapbox api
const geocode = function (place, callback) {
  request(
    {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoiYnVkZyIsImEiOiJja3Bqa3Q0N28wNXZiMnJvMTFjdXE5b2RoIn0.djKq24OMrRg1i5t-lIb4cw&limit=1&fuzzyMatch=false`,
      json: true,
    },
    (error, response) => {
      if (error)
        callback(
          {
            error: "System error!!! ccan't reach location server! try again",
          },
          undefined,
        );
      else if (response.body.features.length === 0 || response.body.message)
        callback({ error: "invalid search" }, undefined);
      else
        callback(undefined, {
          location: response.body.features[0].place_name,
          lat: response.body.features[0].center[1],
          lng: response.body.features[0].center[0],
        });
    },
  );
};

module.exports = geocode;
