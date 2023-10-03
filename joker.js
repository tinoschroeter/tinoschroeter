"use srict";

const fs = require("fs");

const api =
  "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=json&type=single";

fetch(api)
  .then((response) => response.json())
  .then((data) => {
    const joke = data.joke.replace(/(?:\r\n|\r|\n)/g, " ").replace(/"/g, "");

    fs.readFile("./README.md", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const updateFile = data.replace(/^.*joke:.*$/gm, `    joke: "${joke}"`);

      fs.writeFile("./README.md", updateFile, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
