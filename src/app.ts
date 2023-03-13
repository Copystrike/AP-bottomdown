import express, { Application } from "express";
import { PORT_NUMBER } from "./config/debug";
const axios = require('axios');

const app: Application = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use(express.static("src/public")); // To serve static files such as images, CSS files, and JavaScript files
app.set("view engine", "ejs"); // To set the view engine
app.set("views", "src/pages"); // To set the views directory


app.get('/', async (req, res) => {
  res.render("index");
});

app.get('/avatar', async (req, res) => {
  try {
    const response = await axios.get('https://fortnite-api.theapinetwork.com/items/list');
    const items = response.data.data; // get the first 4 items from the response
    console.log(items);
    res.render('avatar', { items });
  } catch (error) {
    console.error(error);
    res.send('Error!');
  }
});



// Starting the server
app.listen(PORT_NUMBER, () => {
  console.log(`SERVER RUNNING ON ${PORT_NUMBER}`);
});
