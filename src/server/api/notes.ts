import express from "express";
import { Request, Response } from "express";
import { getProfile } from "../utils";
import { addNote, deleteNote, getNotesByUserIdAndFortniteId } from "../../database/queryNotes";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const profile = getProfile(req);

  if (!profile) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { fortniteCharacterId, text } = req.body;

  if (!fortniteCharacterId || !text) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  const userNotes = await getNotesByUserIdAndFortniteId(profile?._id, fortniteCharacterId);

  if (userNotes.error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  res.json(await addNote(profile._id, fortniteCharacterId, text));
});

router.get("/:fortniteCharacterId", async (req: Request, res: Response) => {
  const profile = getProfile(req);

  if (!profile) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userNotes = await getNotesByUserIdAndFortniteId(profile?._id, req.params.fortniteCharacterId);

  if (userNotes.error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  res.json(userNotes.data);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const profile = getProfile(req);

  if (!profile) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const objectId = new ObjectId(req.params.id);
  const note = await deleteNote(profile._id, objectId);

  if (note.error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  if (!note.data) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note.data);
});

module.exports = router;
