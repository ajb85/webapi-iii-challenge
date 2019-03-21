require("dotenv").config();
const server = require("./server.js");

server.listen((port = process.env.PORT || 5000), () => {
  console.log(`\nListening on port ${port}`);
});
