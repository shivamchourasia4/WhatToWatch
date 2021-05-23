const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

// @dsc  Auth User
// @route  POST /auth
// @access rignt now public

exports.Auth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Simple Validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please Enter All Fields!" });
    }

    //Check for existing user
    User.findOne({ email: email }).then((user) => {
      if (!user) return res.status(400).json({ msg: "User Does Not Exists!" });

      // Validate Password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials!" });

        jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                username: user.username,
                email: user.email,
              },
            });
          }
        );
      });
    });
  } catch (err) {
    return res.sendStatus(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @dsc  Get User data
// @route  GET /auth/user
// @access Private

exports.getUserdata = (req, res, next) => {
  // console.log(req.params.id);
  User.findById(req.params.id)
    .select("-password")
    .then((user) => res.json(user));
};
// @dsc  Get Users data for Suggestion
// @route  GET /auth/users
// @access Private

exports.getUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then((user) => res.json(user));
};

exports.searchUsers = (req, res, next) => {
  const qry = req.query.name;
  User.find(
    {
      $or: [
        { firstname: { $regex: ".*" + qry + ".*" } },
        { username: { $regex: ".*" + qry + ".*" } },
      ],
    },
    { firstname: 1, lastname: 1, username: 1 }
  ).then((user) => res.json(user));
};

exports.getById = async (req, res, next) => {
  // console.log(req.params.id);
  const info = User.findById(req.params.id, {
    firstname: 1,
    lastname: 1,
    username: 1,
  }).then((usr) => {
    // console.log(usr);
    res.json(usr);
  });
};
