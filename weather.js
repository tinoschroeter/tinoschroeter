const fs = require("fs");
const Weather = require("@tinoschroeter/weather-js");
const { makeBadge } = require("badge-maker");

const weather = new Weather();

weather
  .find({ search: "Hamburg, Germany", degreeType: "C" })
  .then((result) => {
    const data = result[0].current;
    const date = new Date();
    console.log(data);

    let picker = 0;
    const icon = ["", "☁️ ", "❄️ ", "☀️ ", "🌧️ ", "🌩️ ", "🌜"];

    if (data.skytext.match(/[cC]loudy/g)) picker = 1;
    if (data.skytext.match(/[iI]cy/g)) picker = 2;
    if (data.skytext.match(/[sS]now/g)) picker = 2;
    if (data.skytext.match(/[sS]un/g)) picker = 3;
    if (data.skytext.match(/[rR]ain/g)) picker = 4;
    if (data.skytext.match(/[tT]hunder/g)) picker = 5;
    if (picker === 0 && (date.getHours() > 20 || date.getHours() < 7))
      picker = 6;

    const svg = makeBadge({
      label: "Hamburg ",
      message: ` ${icon[picker]} ${
        data.skytext
      } | ${data.temperature.toString()} C°`,
      labelColor: "#555",
      color: "blue",
      style: "flat",
    });
    fs.writeFile("./weather.svg", svg, (err) => {
      if (err) return console.error(err);
    });
  })
  .catch((err) => console.error(err));
