const express = require("express");
const http = require("http");
const { Server } = require("ws");
const connectDB = require("./config/db");
const websocketService = require("./services/webSocketService");
const logger = require("./utils/loger");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

// Connect to database
connectDB();

// Initialize WebSocket logic
websocketService(wss);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown handling
process.on("SIGINT", async () => {
  console.log("Closing server...");
  await mongoose.connection.close();
  process.exit(0);
});
