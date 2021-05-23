const mongoose = require("mongoose");
const Watchlist = require("../models/watchlist").schema;
const Connections = require("../models/connections").schema;

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  joined: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  watchlist: [Watchlist],
  connections: [Connections],
});

module.exports = User = mongoose.model("User", UserSchema);
