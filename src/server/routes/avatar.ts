import axios from "axios";
import { FORTNITE_API_URL } from "../../constants";
import { FortniteResponse } from "../../types/fortnite";
import { getProfile } from "../utils";
import { getFavoritesByUserId } from "../../database/queryFavorites";
import { getBlacklistsByUserId } from "../../database/queryBlacklist";

const express = require("express");
const router = express.Router();

axios.get<FortniteResponse>(FORTNITE_API_URL).then((axiosResponse) => {
  router.get("/", async (req: any, res: any) => {
    const profile = getProfile(req)!; // Unauthorized errors worden behandeld in de middleware
    const response = axiosResponse.data.data;

    const { error: favoError, data: favoData } = await getFavoritesByUserId(profile?._id);
    const { error: blacklistError, data: blacklistData } = await getBlacklistsByUserId(profile?._id);

    if (favoError || !favoData || blacklistError || !blacklistData) {
      return res.redirect("/error");
    }

    const outfitItems = response.filter((item) => item.type.value == "outfit" && item.images && !item.id.toLocaleLowerCase().includes("npc"));

    // check if the item is in the favorites, if so add isFavorite: true
    const randomItems: any[] = [];
    let unsuccessfulAttempts = 0;

    while (randomItems.length < 10 && unsuccessfulAttempts < 3) {
      const randomItemIndex = randomConstraint(0, outfitItems.length - 1);
      const item = outfitItems[randomItemIndex];
      if (!randomItems.includes(item)) {
        const isFavorite = favoData.some((favorite) => favorite.fortnite_id === item.id);
        const isBlacklisted = blacklistData.some((blacklist) => blacklist.fortnite_id === item.id);
        randomItems.push({ ...item, isFavorite, isBlacklisted });
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
