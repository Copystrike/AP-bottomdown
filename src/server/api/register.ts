import { addUser, getUserByUsername, updateUser } from "../../database/queryUser";
import express from "express";

const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username or password is missing" });
  }

  try {
    const oldUser = await getUserByUsername(username);

    if (oldUser.error) {
      return res.status(500).json({ message: "An error occured" });
    }

    if (oldUser.data) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const userData = await addUser(
      {
        username,
      },
      password
    );

    if (userData.error || !userData.data) {
      return res.status(500).json({ message: "An error occured" });
    }

    return res.cookie("session", userData.data).status(200).json({ message: "Successfully registered" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
