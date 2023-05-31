import express, { Application, response } from "express";
import { PORT_NUMBER } from "./config/debug";
import axios from "axios";
import {Cosmetic, ResponseFortnite} from "./types/fortnite"
// import { FortniteItem, MetaData } from "./types/fortnite.ts";
import { FORTNITE_API_URL } from "./constants";
import { connectDatabase } from "./database/database";

const app: Application = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("src/public")); // To serve static files such as images, CSS files, and JavaScript files
app.set("view engine", "ejs"); // To set the view engine
app.set("views", "src/pages"); // To set the views directory
app.disable("view cache"); // disable view cache

app.get("/", async (req, res) => {
  res.render("index");
});

app.get("/nogame", (req, res) => {
  res.render("nogame");
});

app.get("/favoriete", (req, res) => {
  res.render("favoriete");
});

axios.get<ResponseFortnite>('https://fortnite-api.com/v2/cosmetics/br').then((axiosResponse) => {
  app.get("/avatar", async (req, res) => {
    const response = axiosResponse.data.data;
    const filteredResults = response.filter((item: any) => item.type.value === 'outfit');

  const randomItems: Cosmetic[] = [];
  for (let i = 0; i < 10; i++) {
    const randomItemIndex = randomConstraint(0, filteredResults.length - 1);
    const item = filteredResults[randomItemIndex];

    if (randomItems.includes(item)) {
      i--;
      continue;
    }
    randomItems.push(item);
    console.log(randomItems);
  }

  try {
    res.render("avatar", { items: randomItems });
  } catch (error) {
    console.error(error);
    res.send("Error!");
  };
});
});

// axios.get(FORTNITE_API_URL).then((axiosResponse) => {
//   app.get("/avatar", async (req, res) => {
//     // const response = axiosResponse.data;
//     // const outfitItems = response.data.filter((item) => item.item.type === "outfit");

    // randomItems


// random constaint function
const randomConstraint = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Starting the server
app.listen(PORT_NUMBER, () => {
  connectDatabase();
  console.log(`SERVER RUNNING ON http://127.0.0.1:${PORT_NUMBER}/`);
});
