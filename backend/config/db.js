const config = require("./config");
const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(config.MONGO_URI);
  console.log(`Connected to the database`);
};

module.exports = connectDB;
