const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // // For Dev
    // var url = "mongodb://localhost:27017/WhatToWatch";
    // const conn = await mongoose.connect(url);

    const conn = await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
