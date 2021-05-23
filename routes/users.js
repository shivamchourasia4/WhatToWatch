const express = require("express");

const router = express.Router();

//User Model
const { Register } = require("../controllers/userControl");

router.route("/register").post(Register);

module.exports = router;
