const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("x-auth-token");
  //Check for token
  if (!token) res.status(401).json({ msg: "No token, authorization denied" });
  else {
    try {
      //Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Add user from payload
      req.user = decoded;
      next();
    } catch (e) {
      res.status(400).json({ msg: "Token is not valid" });
    }
  }
}

module.exports = authenticate;
