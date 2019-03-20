const express = require("express");
const helmet = require("helmet");
const postRoutes = require("./posts/postRoutes.js");
const userRoutes = require("./users/userRoutes.js");

const server = express();

function capName(req, res, next) {
  if (req.body.name) {
    req.body.name = req.body.name
      .split(" ")
      .map(piece => piece[0].toUpperCase() + piece.substring(1))
      .join(" ");
  }
  next();
}

server.use(express.json());
server.use(helmet());
server.use(capName);
server.use("/api/users", userRoutes);

server.get("/", (req, res, next) => {
  res.status(200).send("OK");
});

//server.use("/api/posts", postRoutes);

module.exports = server;
