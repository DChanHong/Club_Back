const connection = require("../dbConfig");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const customerCtrl = {
  //이거는 걍 연습용
  getCustomer: async (req, res) => {
    connection.query("SELECT * FROM CUSTOMER_TABLE", (error, rows) => {
      if (error) throw error;
      res.send(rows); // 프론트로 rows를 다 보내주겠다.
    });
  },
  insertCustomer: async (req, res) => {
    //request에 프론트에서 넘어온 정보들이 넘어올거다.
    const { c_idx, email, password, name, fm } = req.body;
    const insertSQL = `INSERT INTO CUSTOMER_TABLE(email,password,name,fm) VALUES(?,?,?,?)`;
    // const idSlectSQL =`SELECT email from CUSTOMER_TABLE WHERE email=?`;
    const data = [email, password, name, fm];
    connection.query(insertSQL, data, (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },
  //회원가입폼 아이디 중복확인
  checkID: async (req, res) => {
    const IDcheckSQL = "SELECT email FROM CUSTOMER_TABLE WHERE email=?";
    const { email } = req.body;
    const data = [email];
    connection.query(IDcheckSQL, data, (error, result, rows) => {
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
      "SELECT * FROM CUSTOMER_TABLE WHERE email=? AND password =?";
    const { email, password } = req.body;
    const data = [email, password];
    // console.log(data);

    connection.query(checkLoginSQL, data, (error, result, rows) => {
      // console.log(result);
      if (error) throw error;
      else {
        if (result.length === 1) {
          try {
            //access Token 발급
            const accessToken = jwt.sign(
              {
                email: email,
              },
              process.env.JWT_SECRET_KEY,
              {
                expiresIn: "30m",
                issuer: "hong",
              }
            );
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
  accessToken: async (req, res) => {
    const userDataSQL =
      "SELECT  c_idx, email ,name , fm FROM CUSTOMER_TABLE WHERE email=? ";

    try {
      const token = req.cookies.accessToken;
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const SQLdata = [data.email];
      // console.log(data.email)
      connection.query(userDataSQL, SQLdata, (error, result) => {
        if (error) throw error;
        else {
          res.status(200).json({ data: result });
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUser: async (req, res) => {
    const userInfoSQL =
      "SELECT email ,name , fm,IMG FROM CUSTOMER_TABLE WHERE email=? ";
    const SQLdata = [req.email];
    connection.query(userInfoSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result); // 프론트로 rows를 다 보내주겠다.
    });
  },
  uploadImage: async (req, res) => {
    const updateUserImageSQL = `UPDATE CUSTOMER_TABLE SET IMG =? where email=?`;
    console.log(req.file.originalname);
    const SQLdata = [req.file.originalname, req.email];
    connection.query(updateUserImageSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
};

module.exports = customerCtrl;
