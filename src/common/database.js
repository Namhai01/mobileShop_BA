// database.js
const mongoose = require("mongoose");
const config = require("config");
const DB_URI = config.get("DB").MONGODB_URL_DEV;

mongoose.connect(DB_URI);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});
module.exports = mongoose;
