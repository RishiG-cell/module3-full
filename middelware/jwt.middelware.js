const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  console.log("hi from here ");
  if (req.headers.authorization) {
    if (req.headers.authorization.split(" ")[0] === "Bearer") {
      const theToken = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(theToken, process.env.TOKEN_SECRET);
      req.payload = payload;
      next();
    } else {
      res.status(403).json({ errorMessage: "not valid" });
    }
  } else {
    res.status(403).json({ errorMessage: "no token" });
  }
}

module.exports = { isAuthenticated };
