const connection = require("../dbConfig");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const clubDetailCtrl = {
  //동아리 유저 참여자 정보 불러오기
  getClubDetailUserList: async (req, res) => {
    const selectSQL = `SELECT A.HOSTNAME , A.C_CATEGORY,A.C_CATE_DETAIL, A.C_NAME, A.C_INTRO ,A.C_AREA, A.C_IMAGE, A.C_TEXT, A.C_IDX,B.U_IDX , B.U_NAME,B.U_IMAGE FROM
    (SELECT  T1.U_IDX AS HOSTNAME ,T1.C_CATEGORY,T1.C_CATE_DETAIL ,T1.C_NAME,T1.C_INTRO,T1.C_AREA,T1.C_IMAGE,T1.C_TEXT , T2.C_IDX , T2.U_IDX
    FROM CLUB_TABLE T1
    JOIN ATTEND_USER_TABLE T2
    ON T1.C_IDX = T2.C_IDX
    WHERE T2.C_IDX= ?) A
    JOIN USER_TABLE B
    ON A.U_IDX = B.U_IDX`;
    const SQLdata = [req.query.data];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) {
        throw error;
      }
      res.send(result);
    });
  },
  getClubDetailInfo: async (req, res) => {
    const selectSQL = `SELECT * FROM CLUB_TABLE WHERE C_IDX =?`;
    const SQLdata = [req.query.data];
    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
  getClubText: async (req, res) => {
    // console.lo("일단 여기까지 옴");
    const selectSQL = `SELECT C_TEXT ,U_IDX FROM CLUB_TABLE WHERE C_IDX =?`;
    const SQLdata = [req.query.data];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
  // 동아리 참여자인지 아인지 체크
  clubJoinUserCheck: async (req, res) => {
    // 동아리 참여자가 맞으면 U_IDX 존재 , 아니면 null값
    const selectSQL = `SELECT *FROM ATTEND_USER_TABLE WHERE U_IDX =? AND C_IDX= ?`;

    const SQLdata = [req.query.data, req.data.result[0].U_IDX];
    // console.log(SQLdata);
    // console.log(SQLdata);
    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      else {
        if (result.length === 1) {
          res.json({ data: true });
        } else {
          res.json({ data: false });
        }
      }
    });
  },
  // 동아리 참여하기
  JoinClub: async (req, res) => {
    const insertSQL = " INSERT INTO ATTEND_USER_TABLE VALUES(?,?)"; //C_IDX ,U_IDX
    // console.log(req.data.result[0].U_IDX);
    // console.log(req.body.data);
    const insertData = [req.body.data, req.data.result[0].U_IDX];
    connection.query(insertSQL, insertData, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
  // 동아리 탈퇴하기
  LeaveClub: async (req, res) => {
    const deleteSQL =
      "DELETE FROM ATTEND_USER_TABLE WHERE C_IDX =? AND U_IDX =?";
    // console.log(req.body.data, req.data.result[0].U_IDX);
    const SQLdata = [req.body.data, req.data.result[0].U_IDX];
    connection.query(deleteSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
};

module.exports = clubDetailCtrl;
