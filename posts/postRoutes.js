const express = require("express");
const db = require("./postDb.js");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("get");
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "There was an error retriving the lists of posts" });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.text && req.body.user_id) {
      const newPost = await db.insert(req.body);
      res.status(201).json(newPost);
    } else {
      res.status(400).json({ message: "I need both 'text' and 'id'" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error inserting post" });
  }
});

module.exports = router;
