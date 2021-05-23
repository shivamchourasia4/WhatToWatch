const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Add Movies/Tv Shows To View In Watchist!"],
  },
  media_type: {
    type: String,
    // required: [true, "Media Type Required!"],
  },
  tmdbID: {
    type: String,
    // required: [true, "TMDB_id Missing"],
    // unique: true, <-- uniqueness and required work in MongoDB but not in Mongoose embedded documents
    //(basically adding these are useless)
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  isWatched: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Watchlist", WatchlistSchema);
