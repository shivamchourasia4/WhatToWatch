const express = require("express");

const router = express.Router();

//User Model
const {
  Auth,
  getUserdata,
  getUsers,
  searchUsers,
  getById,
} = require("../controllers/authControl");
const authenticate = require("../middleware/authenticate");

router.route("/login").post(Auth);

router.route("/privateuser/:id").get(authenticate, getById);
router.route("/user/:id").get(authenticate, getUserdata);

router.route("/users").get(authenticate, getUsers);
router.route("/users/search").get(authenticate, searchUsers);

module.exports = router;
