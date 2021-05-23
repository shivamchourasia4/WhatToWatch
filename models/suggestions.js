const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title of movie/tv show required"],
  },
  tmdbID: {
    type: String,
    required: [true, "TMDB id required"],
  },
  media_type: {
    type: String,
    required: [true, "Media Type Required"],
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
  suggestedTo: {
    type: String,
    required: [true, "Suggested To Required"],
  },
  suggestedBy: {
    type: String,
    required: [true, "Suggested By Required"],
  },
});

module.exports = mongoose.model("Suggestions", SuggestionSchema);
