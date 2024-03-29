import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./database/database";
import { PORT_NUMBER } from "./constants";

const fs = require("fs");
const path = require("path");

const app: Application = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("src/public")); // To serve static files such as images, CSS files, and JavaScript files
app.use(cookieParser());
app.set("view engine", "ejs"); // To set the view engine
app.set("views", "src/pages"); // To set the views directory
app.disable("view cache"); // disable view cache

const staticPage = (page: string) => {
  app.get(`/${page}`, (req, res) => {
    res.render(page);
  });
};

// -- Snelle manier om alle routes en middleware te laden
const dirs = ["middleware", "routes", "api"]; // "api" toegevoegd aan de array
dirs.forEach((dir) => {
  const dirPath = path.join(__dirname, `./server/${dir}`);
  fs.readdirSync(dirPath).forEach((file: any) => {
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    const module = require(`${dirPath}/${name}`);
    let routePath = "";

    switch (dir) {
      case "routes":
        routePath = `/${name}`;
        break;
      case "api":
        routePath = `/api/${name}`;
        break;
    }

    console.log(`Loaded ${dir} ${name} - ${routePath || "global"}`);
    app.use(routePath, module);
  });
});

// - Routes
// -- Snelle manier om alle statische pagina's te renderen
// -- als de pagina naam zelde is als de file naam en heeft geen backend data nodig dan kan je hem hier inzetten
const staticPages = ["index", "login", "nogame", "blacklist", "register"];
staticPages.forEach((page) => staticPage(page));

// Als je naar / gaat, render dan index.ejs
app.get("/", async (req, res) => {
  res.render("index");
});

// Starting the server
app.listen(PORT_NUMBER, () => {
  connectDatabase();
  console.log(`SERVER RUNNING ON http://127.0.0.1:${PORT_NUMBER}/`);
});
