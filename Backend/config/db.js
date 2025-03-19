const mongoose = require("mongoose");
const logger = require("../utils/loger");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
