import express, { Application } from "express";
import { PORT_NUMBER } from "./config/debug";
import { IS_DEV } from "./constants";

const app: Application = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("src/public")); // To serve static files such as images, CSS files, and JavaScript files
app.set("view engine", "ejs"); // To set the view engine
app.set("views", "src/pages"); // To set the views directory
app.disable('view cache'); // disable view cache

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/favoriete", (req, res) => {
  res.render("favoriete");
});

// Starting the server
app.listen(PORT_NUMBER, () => {
  console.log(`SERVER RUNNING ON ${PORT_NUMBER}`);
});