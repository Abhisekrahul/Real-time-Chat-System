const chatController = require("../controllers/chatController");
const Message = require("../models/messageModel"); // Add this line to fetch messages from DB
const logger = require("../utils/loger");

module.exports = (wss) => {
  wss.on("connection", async (ws) => {
    logger.info("Client connected");

    // Send last 10 messages to the newly connected client
    const recentMessages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(10);
    ws.send(JSON.stringify({ recentMessages }));

    ws.on("message", async (message) => {
      const { sender, content } = JSON.parse(message);
      if (!sender || !content) {
        ws.send(JSON.stringify({ error: "Invalid message format" }));
        return;
      }

      await chatController.saveMessage(sender, content);
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ sender, content }));
        }
      });
    });

    ws.on("close", () => {
      logger.info("Client disconnected");
    });
  });
};
