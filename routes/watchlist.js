const express = require("express");

const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require("../controllers/watchlistControl");

router
  .route("/watchlist")
  .post(authenticate, addToWatchlist)
  .delete(authenticate, removeFromWatchlist);

router.route("/watchlist/:id").get(authenticate, getWatchlist);

module.exports = router;
