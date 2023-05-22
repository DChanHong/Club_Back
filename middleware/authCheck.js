const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const authCheck = (req, res, next) => {
  // console.log(req.headers.cookie);
  if (req.headers.cookie) {
    const token = req.headers.cookie.split("accessToken=")[1];
    const userEmail = jwt.verify(token, process.env.JWT_SECRET_KEY);
    try {
      req.email = userEmail.email;
      req.data = userEmail;
      // console.log(req.U_IDX);

      next();
    } catch (error) {
      res.status(401).json({ error: " Auth Error from authChecker" });
    }
  } else {
    res.status(402).json({ data: "로그인 상태가 아닙니다" });
  }
};

module.exports = authCheck;
