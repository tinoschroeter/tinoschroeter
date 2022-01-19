const fs = require("fs");
("use srict");

const axios = require("axios").default;
const api =
  "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt&type=single";

axios
  .get(api)
  .then((response) => {
    const joke = response.data
      .replace(/(?:\r\n|\r|\n)/g, " ")
      .replace(/"/g, "");

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
