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

module.exports = router;
