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
      "SELECT * FROM USER_TABLE WHERE U_EMAIL=? AND U_PASSWORD =?";
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
  // accessToken: async (req, res) => {
  //   const userDataSQL =
  //     "SELECT  c_idx, email ,name , fm FROM CUSTOMER_TABLE WHERE email=? ";

  //   try {
  //     const token = req.cookies.accessToken;
  //     const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //     const SQLdata = [data.email];
  //     // console.log(data.email)
  //     connection.query(userDataSQL, SQLdata, (error, result) => {
  //       if (error) throw error;
  //       else {
  //         res.status(200).json({ data: result });
  //       }
  //     });
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },
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
    console.log(req.file.originalname);
    const SQLdata = [req.file.originalname, req.email];
    connection.query(updateUserImageSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
  test: async (req, res) => {
    const testSQL = `SELECT T1.C_IDX , T1.U_IDX , T1.C_CATEGORY ,T1.C_CATE_DETAIL ,T1.C_NAME,T1.C_INTRO,T1.C_AREA,C_IMAGE ,T2.TOP_CLUB  FROM CLUB_TABLE T1 
    LEFT JOIN (SELECT C_IDX , count(C_IDX) as TOP_CLUB FROM ATTEND_USER_TABLE GROUP BY C_IDX ORDER BY count(C_IDX) DESC LIMIT 10) T2
    ON T1.C_IDX = T2.C_IDX
    ORDER BY T2.TOP_CLUB DESC LIMIT 10`;
    connection.query(testSQL, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
};

module.exports = customerCtrl;
