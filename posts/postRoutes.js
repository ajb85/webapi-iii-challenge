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
    if (req.body.text !== undefined && req.body.user_id !== undefined) {
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.remove(id);
    user
      ? res.status(200).end()
      : res.status(404).json({ message: "No post by that id" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting the post" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.text !== undefined && req.body.user_id !== undefined) {
      const post = await db.update(id, req.body);
      post
        ? res.status(200).end()
        : res.status(404).json({ message: "No post by that id found" });
    } else {
      res.status(400).json({
        message: "I need the user_id and text for the post to update"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong updating the post" });
  }
});

module.exports = router;
