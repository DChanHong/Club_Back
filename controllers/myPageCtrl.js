const connection = require("../dbConfig");
require("dotenv").config();

const myPageCtrl = {
  // 마이페이지 내가 참여중인 동아리 리스트
  getMyAttClubList: async (req, res) => {
    const selectSQL = `SELECT * FROM
    (SELECT T1.U_IDX ,T1.C_IDX , T2.C_CATEGORY,T2.C_CATE_DETAIL, T2.C_NAME, T2.C_AREA FROM ATTEND_USER_TABLE T1
        JOIN CLUB_TABLE T2
        ON T1.C_IDX = T2.C_IDX) A
    JOIN (SELECT U_IDX FROM USER_TABLE WHERE U_EMAIL =?) B
    WHERE A.U_IDX =B.U_IDX;`;
    const SQLdata = [req.email];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  // 내가 방장인 동아리 리스트
  getMyHostClubList: async (req, res) => {
    const selectSQL = `SELECT *FROM
    (SELECT C_IDX,U_IDX,C_CATEGORY,C_CATE_DETAIL, C_NAME ,C_AREA FROM CLUB_TABLE) A
    JOIN (SELECT U_IDX FROM USER_TABLE WHERE U_EMAIL =?) B
    ON A.U_IDX = B.U_IDX`;
    const SQLdata = [req.email];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  //회원 탈퇴하기
  withdrawalUser: async (req, res) => {
    const updateSQL = `UPDATE USER_TABLE SET U_WITHDRAWAL = 'true' WHERE U_IDX=?`;
    const data = [req.data.result[0].U_IDX];
    // console.log(data);
    connection.query(updateSQL, data, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
      // res.clearCookie(req.headers.cookie).redirect("/");
    });
  },
  getUser: async (req, res) => {
    const userInfoSQL =
      "SELECT U_EMAIL ,U_NAME , U_GENDER,U_BIRTH,U_IMAGE FROM USER_TABLE WHERE U_EMAIL=? ";
    const SQLdata = [req.email];
    connection.query(userInfoSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result); // 프론트로 rows를 다 보내주겠다.
    });
  },
};

module.exports = myPageCtrl;
