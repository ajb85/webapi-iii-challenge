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
      res.status(201).json(newPost);
    } else {
      res.status(400).json({ message: "Please provide a name." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error posting to database" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const remove = await db.remove(id);
    remove
      ? res.status(200).end()
      : res.status(404).json({ message: "No user by that id" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Everything exploded, sorry.  Try again." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.name) {
      const updateUser = await db.update(id, req.body);
      updateUser
        ? res.status(200).end()
        : res.status(404).json({ message: "No user by that ID found" });
    } else {
      res.status(400).json({ message: "I need the new name you use to use" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There was an error updating the user" });
  }
});

module.exports = router;
