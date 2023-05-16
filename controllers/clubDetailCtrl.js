const connection = require("../dbConfig");
require("dotenv").config();

const clubDetailCtrl = {
  //동아리 유저 참여자 정보 불러오기
  getClubDetailUserList: async (req, res) => {
    const selectSQL = `SELECT A.HOSTNAME , A.C_CATEGORY,A.C_CATE_DETAIL, A.C_NAME, A.C_INTRO ,A.C_AREA, A.C_IMAGE, A.C_TEXT, A.C_IDX,B.U_IDX , B.U_NAME,B.U_IMAGE FROM
    (SELECT  T1.U_IDX AS HOSTNAME ,T1.C_CATEGORY,T1.C_CATE_DETAIL ,T1.C_NAME,T1.C_INTRO,T1.C_AREA,T1.C_IMAGE,T1.C_TEXT , T2.C_IDX , T2.U_IDX
    FROM CLUB_TABLE T1
    JOIN ATTEND_USER_TABLE T2
    ON T1.C_IDX = T2.C_IDX
    WHERE T2.C_IDX= 1) A
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
    const selectSQL = `SELECT C_TEXT FROM CLUB_TABLE WHERE C_IDX =?`;
    const SQLdata = [req.query.data];
    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
};

module.exports = clubDetailCtrl;
