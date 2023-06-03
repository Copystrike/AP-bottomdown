import express from "express";
import { Request, Response } from "express";
import { getProfile } from "../utils";
import { addFavorite, getFavoritesByUserId } from "../../database/queryFavorites";

const router = express.Router();


router.post("/", async (req: Request, res: Response) => {
    const profile = getProfile(req);

    if (!profile) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const userFavorites = await getFavoritesByUserId(profile?._id);

    if (userFavorites.error) {
        return res.status(500).json({ message: "Internal server error" });
    }

    // Check if already added
    if (userFavorites.data?.find((favorite) => favorite.fortnite_id === req.body.fortniteCharacterId)) {
        return res.status(400).json({ message: "Already added" });
    }

    const favo = await addFavorite(profile._id, req.body.fortniteCharacterId)
    res.json(favo);
});

router.get("/", async (req: Request, res: Response) => {
    const profile = getProfile(req);

    if (!profile) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const favo = getFavoritesByUserId(profile?._id);

    res.json(favo);
});



module.exports = router;