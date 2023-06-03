import express from "express";
import { Request, Response } from "express";
import { getProfile } from "../utils";
import { addStat, deleteStats, getStatsByUserIdAndFortniteId } from "../../database/queryStats";
import { ObjectId } from "mongodb";

const router = express.Router();

// router.post("/", async (req: Request, res: Response) => {
//     const profile = getProfile(req);

//     if (!profile) {
//         res.status(401).json({ message: "Unauthorized" });
//         return;
//     }
//     const userNotes = await getStatsByUserIdAndFortniteId(profile?._id, fortniteCharacterId);

//     if (userNotes.error) {
//         return res.status(500).json({ message: "Internal server error" });
//     }

//     res.json(await addNote(profile._id, fortniteCharacterId, text));
// });

// get stats
router.get("/:fortniteCharacterId", async (req: Request, res: Response) => {
    const profile = getProfile(req);

    if (!profile) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const userNotes = await getStatsByUserIdAndFortniteId(profile?._id, req.params.fortniteCharacterId);

    if (userNotes.error) {
        return res.status(500).json({ message: "Internal server error" });
    }

    res.json(userNotes.data);
});


router.delete("/:id", async (req: Request, res: Response) => {
});
module.exports = router;