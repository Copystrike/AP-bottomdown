import express from "express";
import { Request, Response } from "express";
import { setLinkedItem } from "../../database/queryLinkedItem";
import { getProfile } from "../utils";

const router = express.Router();

// fortniteCharacterId: fortniteCharacterId,
// item_id: pickaxe.id,
// slot: slot,

router.post("/", async (req: Request, res: Response) => {
    const user = getProfile(req);
    const { fortniteCharacterId, item_id, slot } = req.body;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!fortniteCharacterId || !item_id || !slot) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    await setLinkedItem(user._id, fortniteCharacterId, item_id, slot).then((result) => {
        if (result.success) {
            res.status(200).json(result);
        }
        else {
            res.status(500).json(result);
        }
    });
});


module.exports = router;