const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const connectDB = require("./config/db");
const app = require("./app"); // express app

require("dotenv").config();

const server = http.createServer(app);

const io = socketIO(server, {
  cors: { origin: "*" }
});

// export io so other files can use it
module.exports = io;

// start price engine
const startPriceFeed = require("./services/livePriceEngine");
startPriceFeed();

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
