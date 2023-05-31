import axios from "axios";
import { FORTNITE_API_URL } from "../../constants";
import { FortniteItem, MetaData } from "../../types/fortnite";
import { getBlacklistsByUserId } from "../../database/queryBlacklist";

const express = require("express");
const router = express.Router();

router.get("/", async (req: any, res: any) => {
    const response = getBlacklistsByUserId;
    const theBlackList = getBlacklistsByUserId("647719929dacaa637c487ae2");

    try {
      res.render("blacklist", { 
        theBlackList : theBlackList
       });
    } catch (error) {
      console.error(error);
      res.send("Error!");
    }
  });

  
  module.exports = router;