import axios from "axios";
import { FORTNITE_API_URL } from "../../constants";
import { FortniteResponse } from "../../types/fortnite";

const express = require("express");
const router = express.Router();

axios.get<FortniteResponse>(FORTNITE_API_URL).then((axiosResponse) => {
  router.get("/", async (req: any, res: any) => {
    const response = axiosResponse.data.data.items;
    const outfitItems = response.filter((item) => item.type.value == "outfit" && item.images);

    // randomItems
    const randomItems: any[] = [];
    let unsuccessfulAttempts = 0;

    while (randomItems.length < 10 && unsuccessfulAttempts < 3) {
      const randomItemIndex = randomConstraint(0, outfitItems.length - 1);
      const item = outfitItems[randomItemIndex];
      if (!randomItems.includes(item)) {
        randomItems.push(item);
      } else unsuccessfulAttempts++;
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
