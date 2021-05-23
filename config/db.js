const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // For Dev
    // var url = "mongodb://localhost:27017/WhatToWatch";
    // //For local db
    // const conn = await mongoose.connect(url, {
    //   //for remote, add uri in env and use MONGO_URI
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    // });

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //for remote, add uri in env and use MONGO_URI
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
