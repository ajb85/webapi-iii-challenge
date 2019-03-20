const express = require("express");
const db = require("./userDB.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.name) {
      const newPost = await db.insert(req.body);
      res.status(201).json(req.body);
    } else {
      res.status(400).json({ message: "Please provide a name." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error posting to database" });
  }
});

module.exports = router;
