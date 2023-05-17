// const jwt = require("jsonwebtoken");

// const dotenv = require("dotenv");
// dotenv.config();

// const hostCheck = (req, res, next) => {
//   if (req.headers.cookie) {
//     const token = [req.headers.cookie.split("accessToken=")[1]];
//     console.log(token.length);
//     if (token.length === 1) {
//       //   console.log("미들");
//       //토큰이 존재하므로 로그인 상태
//       // 로그인 아이디 넘겨서 방장인지 확인하기
//       const userEmail = jwt.verify(token[0], process.env.JWT_SECRET_KEY);

//       //   console.log(userEmail);
//       try {
//         req.email = userEmail.email;
//         // console.log(req.email);
//         next();
//       } catch (error) {
//         throw error;
//       }
//     } else {
//       //토큰 없을 경우 그냥 넘기기
//       next();
//     }
//   }
// };

// module.exports = hostCheck;
