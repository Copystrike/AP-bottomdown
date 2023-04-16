import axios from "axios";
import { FORTNITE_API_URL } from "../../constants";
import { FortniteItem, MetaData } from "../../types/fortnite";

const express = require("express");
const router = express.Router();

axios.get<FortniteItem>(FORTNITE_API_URL).then((axiosResponse) => {
  router.get("/", async (req: any, res: any) => {
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

module.exports = router;
