const connection = require("../dbConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const customerCtrl = {
  //회원가입
  insertCustomer: async (req, res) => {
    //request에 프론트에서 넘어온 정보들이 넘어올거다.
    const { email, password, name, gender, birth } = req.body;
    const insertSQL = `INSERT INTO USER_TABLE(U_EMAIL,U_PASSWORD,U_NAME,U_GENDER,U_BIRTH) VALUES(?,?,?,?,?)`;

    const data = [email, password, name, gender, birth];
    connection.query(insertSQL, data, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },
  //회원가입폼 아이디 중복확인
  checkID: async (req, res) => {
    const IDcheckSQL = "SELECT U_EMAIL FROM USER_TABLE WHERE U_EMAIL=?";
    const { email } = req.body;
    const data = [email];
    connection.query(IDcheckSQL, data, (error, result) => {
      if (error) throw error;
      else {
        if (result.length === 0) {
          res
            .status(200)
            .json({ data: true, message: "사용 가능한 아이디입니다." });
        } else {
          res
            .status(200)
            .json({ data: false, message: "사용 불가능한 아이디입니다." });
        }
      }
    });
  },
  //로그인 창 ID PW 유효성 확인 후 쿠키 배송
  checkLogin: async (req, res) => {
    const checkLoginSQL =
      "SELECT U_IDX,U_EMAIL FROM USER_TABLE WHERE U_EMAIL=? AND U_PASSWORD =?";
    const { email, password } = req.body;
    const data = [email, password];
    // console.log(data);

    connection.query(checkLoginSQL, data, (error, result, rows, field) => {
      // console.log(result);
      if (error) throw error;
      else {
        if (result.length === 1) {
          try {
            //access Token 발급
            // console.log(result);
            const accessToken = jwt.sign(
              {
                email: email,
                result,
              },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: "30m",
                issuer: "hong",
              }
            );
            // console.log(accessToken);
            res.cookie("accessToken", accessToken, {
              secure: false,
              httpOnly: true,
            });
            res.status(200).json({
              login: true,
              message: "로인 성공 및 토큰이 발급되었습니다.",
              data: false,
              accessToken,
            });
          } catch (error) {
            res.status(500).json(error);
          }
        } else {
          res
            .status(200)
            .json({ data: true, message: "로그인에 실패하였습니다." });
        }
      }
    });
  },
  getUser: async (req, res) => {
    const userInfoSQL =
      "SELECT U_EMAIL ,U_NAME , U_GENDER,U_BIRTH,U_IMAGE FROM USER_TABLE WHERE U_EMAIL=? ";
    const SQLdata = [req.email];
    connection.query(userInfoSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result); // 프론트로 rows를 다 보내주겠다.
    });
  },
  uploadImage: async (req, res) => {
    const updateUserImageSQL = `UPDATE USER_TABLE SET U_IMAGE =? where U_EMAIL=?`;
    // console.log(req.file.originalname);
    const SQLdata = [req.file.originalname, req.email];
    connection.query(updateUserImageSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
};

module.exports = customerCtrl;
