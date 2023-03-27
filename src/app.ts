import express, { Application, response } from "express";
import { PORT_NUMBER } from "./config/debug";
import { IS_DEV } from "./constants";
import axios from "axios";
import { FortniteItem, MetaData } from "./types/fortnite";
import { FORTNITE_API_URL } from "./constants";

const app: Application = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("src/public")); // To serve static files such as images, CSS files, and JavaScript files
app.set("view engine", "ejs"); // To set the view engine
app.set("views", "src/pages"); // To set the views directory
app.disable("view cache"); // disable view cache

app.get("/", async (req, res) => {
  res.render("index");
});

axios.get<FortniteItem>(FORTNITE_API_URL).then((axiosResponse) => {
  app.get("/avatar", async (req, res) => {
    const response = axiosResponse.data;
    const outfitItems = response.data.filter((item) => item.item.type === "outfit");

    // randomItems
    const randomItems: MetaData[] = [];
    for (let i = 0; i < 10; i++) {
      const randomItemIndex = randomConstraint(0, outfitItems.length - 1);
      const item = outfitItems[randomItemIndex];

      if (randomItems.includes(item)) {
        i--;
        continue;
      }
      randomItems.push(item);
    }

    try {
      res.render("avatar", { items: randomItems });
    } catch (error) {
      console.error(error);
      res.send("Error!");
    }
  });
});

app.get("/nogame", (req, res) => {
  res.render("nogame");
});

axios.get<FortniteItem>(FORTNITE_API_URL).then((axiosResponse) => {
  app.get("/avatar", async (req, res) => {
    const response = axiosResponse.data;
    const outfitItems = response.data.filter((item) => item.item.type === "outfit");

    // randomItems
    const randomItems: MetaData[] = [];
    for (let i = 0; i < 10; i++) {
      const randomItemIndex = randomConstraint(0, outfitItems.length - 1);
      const item = outfitItems[randomItemIndex];

      if (randomItems.includes(item)) {
        i--;
        continue;
      }
      randomItems.push(item);
    }

    try {
      res.render("avatar", { items: randomItems });
    } catch (error) {
      console.error(error);
      res.send("Error!");
    }
  });
});

// random constaint function
const randomConstraint = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Starting the server
app.listen(PORT_NUMBER, () => {
  console.log(`SERVER RUNNING ON http://127.0.0.1:${PORT_NUMBER}/`);
});
