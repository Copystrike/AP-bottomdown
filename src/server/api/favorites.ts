import express from "express";
import { Request, Response } from "express";
import { getProfile } from "../utils";
import { addFavorite, getFavoritesByUserId } from "../../database/queryFavorites";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
    const profile = getProfile(req);

    if (!profile) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const favo = getFavoritesByUserId(profile?._id)

    res.json(favo);
});

router.post("/", async (req: Request, res: Response) => {
    const profile = getProfile(req);

    if (!profile) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const favo = addFavorite(profile._id, req.body.fortnite_id)
    res.json(favo);
});

module.exports = router;