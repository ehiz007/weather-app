export default function handler(req, res) {
  const address = req.query.address;

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=${process.env.locationKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.features.length > 0) {
        const location = response.features[0].place_name;
        const [lat, long] = response.features[0].center;
        const url2 = `http://api.weatherstack.com/current?access_key=${
          process.env.weatherKey
        }&query=${`${long},${lat}`}`;
        fetch(url2)
          .then((response) => response.json())
          .then((response) => {
            if (response) {
              console.log(0);
              res.status(200).json({
                temperature: response.current.temperature,
                summary: `The weather is ${response.current.weather_descriptions[0]}. There is ${res.precip}% chance of precipitation`,
                icons: response.current.weather_icons[0],
                time: response.location.localtime_epoch,
                location,
              });
            } else {
              console.log(1);
              throw new Error("invalid locaton");
            }
          });
      } else {
        res.status(400).json({ error: "location not found" });
      }
    })
    .catch((e) => res.status(400).json({ error: "location not found" }));
}
