const user = require("../models/user");
const Watchlist = require("../models/watchlist");

exports.addToWatchlist = async (req, res, next) => {
  try {
    const reqbody = req.body;

    const WatchlistEntity = new Watchlist({
      title: reqbody.title,
      media_type: reqbody.media_type,
      tmdbID: reqbody.tmdbID,
    });

    try {
      const addEntity = await user.findByIdAndUpdate(reqbody.id, {
        $push: { watchlist: WatchlistEntity },
      });

      if (addEntity.nModified === 0) {
        return res.status(400).json({
          success: false,
          data: addEntity,
          msg: "Not A Valid Connection Id",
        });
      }

      return res.status(201).json({
        success: true,
        msg: "Added To Watchlist",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        msg: "Not A Valid Id",
      });
    }
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

//tmdb error catching needs to be fixed
exports.removeFromWatchlist = async (req, res, next) => {
  try {
    try {
      const del = await user.updateOne(
        { _id: req.body.id },
        {
          $pull: {
            watchlist: {
              tmdbID: req.body.tmdbID,
              media_type: req.body.media_type,
            },
          },
        }
      );

      if (del.nModified === 0) {
        return res.status(400).json({
          success: false,
          data: del,
          msg: "Not A Valid Tmdb Id",
        });
      }
      return res.status(201).json({
        success: true,
        data: del,
        msg: "Removed From Watchlist",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        msg: "Not A Valid Id",
      });
    }
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

//Get watchlist

exports.getWatchlist = (req, res, next) => {
  const connections = user.findById(req.params.id).then((user) => {
    res.json(user.watchlist);
  });
};
