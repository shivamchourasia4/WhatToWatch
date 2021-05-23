const express = require("express");
const router = express.Router();

const {
  getSuggestions,
  addSuggestion,
} = require("../controllers/suggestControl");
const authenticate = require("../middleware/authenticate");

router
  .route("/suggest/:id")
  .get(authenticate, getSuggestions)
  .post(authenticate, addSuggestion);

module.exports = router;
