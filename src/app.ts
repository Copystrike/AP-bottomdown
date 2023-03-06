import express, { Application } from "express";
import http from "http";
import { PORT_NUMBER } from "./config/debug";

const app: Application = express();
const server: http.Server = http.createServer(app);

// Starting the server
server.listen(PORT_NUMBER, () => {
  console.log(`SERVER RUNNING ON ${PORT_NUMBER}`);
});
