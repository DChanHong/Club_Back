const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const authCheck = (req, res, next) => {
  if (req.headers.cookie) {
    const token = req.headers.cookie.split("accessToken=")[1];
    const userEmail = jwt.verify(token, process.env.JWT_SECRET_KEY);
    try {
      req.email = userEmail.email;
      next();
    } catch (error) {
      res.status(401).json({ error: " Auth Error from authChecker" });
    }
  } else {
    res.status(401).json({ error: "Auth Error from authChecker" });
  }
};

module.exports = authCheck;
