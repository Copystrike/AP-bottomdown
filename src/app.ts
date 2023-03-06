import express, { Application } from "express";
import { PORT_NUMBER } from "./config/debug";

const app: Application = express();
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "src/pages");

app.get("/", (req, res) => {
  res.render("pages/index", {});
});

// Starting the server
app.listen(PORT_NUMBER, () => {
  console.log(`SERVER RUNNING ON ${PORT_NUMBER}`);
});
