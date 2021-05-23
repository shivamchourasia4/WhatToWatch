const Suggestions = require("../models/suggestions");

exports.getSuggestions = async (req, res, next) => {
  try {
    const suggest = await Suggestions.find({
      suggestedTo: req.params.id,
    }).sort({ addedAt: "descending" });

    return res.status(200).json({
      success: true,
      data: suggest,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

//@desc add Suggestion
//route POST ...
//@access PRIVATE

exports.addSuggestion = async (req, res, next) => {
  try {
    const suggest = await Suggestions.create(req.body);

    return res.status(201).json({
      success: true,
      data: suggest,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
