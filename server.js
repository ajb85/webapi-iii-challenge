const express = require("express");
const postRouter = require("./posts/postRoutes.js");
const userRouter = require("./users/userRoutes.js");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("OK");
});

server.use("/api/users", userRoutes);
server.use("/api/posts", postRoutes);

module.exports = server;
