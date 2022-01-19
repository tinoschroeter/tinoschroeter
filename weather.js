const weather = require("weather-js");
const { makeBadge, ValidationError } = require("badge-maker");
const fs = require("fs");

weather.find({ search: "Hamburg", degreeType: "C" }, (err, result) => {
  if (err) return console.error(err);

  const data = result[0].current;
  let color = "brightgreen"

  if(data.temperature < 12) color = "blue";
  if(data.temperature > 21) color = "yellow";
  if(data.temperature > 30) color = "red";

  const svg = makeBadge({
    label: "Hamburg ",
    message: ` ${data.skytext} | ${data.temperature.toString()} C`,
    labelColor: "#555",
    color,
    style: "flat",
  });
  fs.writeFile("./weather.svg", svg, (err) => {
    if (err) return console.error(err);
  });
});
