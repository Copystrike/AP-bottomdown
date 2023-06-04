import express from "express";
import { Request, Response } from "express";
import { getProfile } from "../utils";
import { addStat, getStatsByUserIdAndFortniteId, updateStats } from "../../database/queryStats";
import { Stats } from "../../types/database";
import { addBlacklist } from "../../database/queryBlacklist";
import { deleteFavorite } from "../../database/queryFavorites";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const profile = getProfile(req);

  if (!profile) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { fortniteCharacterId, stat, type } = req.body;

  let stats = await getStatsByUserIdAndFortniteId(profile._id, fortniteCharacterId);

  if (!stats.data) {
    stats = await addStat(profile._id, fortniteCharacterId, 0, 0);
  }

  const { _id, wins, losses } = stats.data as Stats;

  if (!_id) {
    return res.status(404).json({ message: "Stats not found" });
  }

  let result;

  switch (stat) {
    case "wins":
      result = await updateStats(_id, type === "increment" ? wins + 1 : wins - 1, losses);
      break;
    case "loss":
      result = await updateStats(_id, wins, type === "increment" ? losses + 1 : losses - 1);
      break;
    default:
      return res.status(400).json({ message: "Bad request" });
  }

  let isBlacklisted = false;

  // if losses are 3 times bigger than the wins, then we blacklist the character
  const apart = result.data?.losses !== undefined && result.data?.wins !== undefined ? result.data.losses - result.data.wins : 0;
  if (apart > 3) {
    isBlacklisted = true;
    await addBlacklist(profile._id, fortniteCharacterId, "personage trekt op niets");
    await deleteFavorite(profile._id, fortniteCharacterId);
  }

  res.json({ ...result, isBlacklisted });
});

router.get("/:fortniteCharacterId", async (req: Request, res: Response) => {
  const profile = getProfile(req);

  if (!profile) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const id = req.params.fortniteCharacterId;

  const userNotes = await getStatsByUserIdAndFortniteId(profile?._id, req.params.fortniteCharacterId);

  if (userNotes.error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  const data = userNotes.data;

  if (!data) {
    return res.status(200).json({
      _id: id,
      user_id: profile._id,
      fortnite_id: req.params.fortniteCharacterId,
      wins: 0,
      losses: 0,
    });
  }

  res.json(userNotes.data);
});

router.delete("/:id", async (req: Request, res: Response) => {});
module.exports = router;
