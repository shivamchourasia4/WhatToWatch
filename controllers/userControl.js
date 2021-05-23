const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @dsc  Register New User
// @route  POST /register
// @access rignt now public

exports.Register = async (req, res, next) => {
  var { firstname, lastname, username, email, password } = req.body;
  firstname = firstname.toLowerCase();
  lastname = lastname.toLowerCase();
  // console.log(firstname);
  const regex = "^(?!.*..)(?!.*.$)[^W][w.]{0,29}$";
  try {
    //Simple Validation
    if (!firstname || !lastname || !username || !email || !password) {
      console.log("empty");
      return res.status(400).json({ msg: "Please Enter All Fields" });
    }
    // else if (!regex.match(username)) {
    //   return res.status(400).json({
    //     msg:
    //       "Username Must Contain Only Lower Case Letter, Numbers, UnderScores and Periods!",
    //   });
    // }
    else {
      //Check for existing user
      User.findOne({ email: email }).then((user) => {
        if (user) {
          return res
            .status(400)
            .send({ msg: "User With That Email Already Exists!" });
        } else {
          User.findOne({ username: username }).then((user) => {
            if (user) {
              return res.status(400).send({ msg: "Username Already Taken!" });
            } else {
              const newUser = new User({
                firstname,
                lastname,
                email,
                username,
                password,
              });

              //Create Salt & hash
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save().then((user) => {
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
              });
            }
          });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
