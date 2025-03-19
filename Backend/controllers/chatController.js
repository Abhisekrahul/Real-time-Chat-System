const Message = require("../models/messageModel");

exports.saveMessage = async (sender, content) => {
  try {
    const message = new Message({ sender, content });
    await message.save();
  } catch (error) {
    console.error("Error saving message", error);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
