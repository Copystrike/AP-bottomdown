import axios from "axios";
import { FORTNITE_API_URL } from "../../constants";
import { FortniteItem, MetaData } from "../../types/fortnite";

const express = require("express");
const router = express.Router();

router.post("/", async (req: any, res: any) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password is missing" });
  }

  // DIT IS MAAR TIJDELIJK
  if (username === "admin" && password === "password") {
    res.cookie("session", "123456");
    return res.status(200).json({ message: "Correct" });
  }

  return res.status(401).json({ message: "Wrong username or password" });
});

module.exports = router;
