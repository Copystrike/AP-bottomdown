import express from "express";
import { Request, Response } from "express";
import { getProfile } from "../utils";
import { deleteBlacklist, updateBlacklist, getBlacklistsByUserId } from "../../database/queryBlacklist";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
    const profile = getProfile(req)!; // Unauthorized errors worden behandeld in de middleware

    const { id } = req.params;

    if (!id) {
        return res.json({ message: "No id provided" });
    }

    const { error, data } = await getBlacklistsByUserId(profile?._id);


    if (error || !data) {
        return res.json({ message: "Internal server error" });
    }

    const result = data.find((item) => item.fortnite_id === id);

    res.json({ ...result });
});


router.delete("/:id", async (req: Request, res: Response) => {
    const profile = getProfile(req)!; // Unauthorized errors worden behandeld in de middleware
    const { id } = req.params;

    if (!id) {
        return res.json({ message: "No id provided" });
    }

    const { error, data } = await deleteBlacklist(profile?._id, id);

    if (error) {
        return res.json({ message: "Internal server error" });
    }

    res.json(data);
});

router.put("/", async (req: Request, res: Response) => {
    const profile = getProfile(req)!; // Unauthorized errors worden behandeld in de middleware

    const { id, reason } = req.body;

    if (!id || !reason) {
        return res.json({ message: "No id or reason provided" });
    }

    const { error, data } = await updateBlacklist(profile._id, id, reason);

    if (error) {
        return res.json({ message: "Internal server error" });
    }

    res.json(data);
});


module.exports = router;