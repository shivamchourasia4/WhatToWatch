const mongoose = require("mongoose");

const ConnectionSchema = new mongoose.Schema({
  connectId: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Connections", ConnectionSchema);
