const connection = require("../dbConfig");
require("dotenv").config();

const homeAddCtrl = {
  // 동아리 인기리스트 블러오기
  getTopClubList: async (req, res) => {
    const selectSQL = `SELECT T1.C_IDX , T1.U_IDX , T1.C_CATEGORY ,T1.C_CATE_DETAIL ,T1.C_NAME,T1.C_INTRO,T1.C_AREA,C_IMAGE ,T2.TOP_CLUB  FROM CLUB_TABLE T1 
    LEFT JOIN (SELECT C_IDX , count(C_IDX) as TOP_CLUB FROM ATTEND_USER_TABLE GROUP BY C_IDX ORDER BY count(C_IDX) DESC LIMIT 10) T2
    ON T1.C_IDX = T2.C_IDX
    ORDER BY T2.TOP_CLUB DESC LIMIT 10`;
    connection.query(selectSQL, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
  // 카테고리별 동아리 정보 불러오기
  getCateClubList: async (req, res) => {
    const selectSQL = `SELECT * FROM CLUB_TABLE WHERE C_CATEGORY =? ORDER BY RAND() LIMIT 6`;
    const SQLData = [req.query.data];
    // console.log(SQLData);
    connection.query(selectSQL, SQLData, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
  //인기리스트 카루셀
  getSliderModalInfo: async (req, res) => {
    const selectSQL = `SELECT C_IDX,U_IDX,C_CATEGORY,C_CATE_DETAIL,C_NAME,C_INTRO, C_AREA,C_IMAGE FROM CLUB_TABLE WHERE C_IDX=?`;
    const SQLdata = [req.query.data];
    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
  // 동아리 생성
  insertNewClubInfo: async (req, res) => {
    const insertSQL = `INSERT INTO CLUB_TABLE(U_IDX,C_CATEGORY,C_CATE_DETAIL,C_NAME,C_INTRO,C_AREA) VALUES(?,?,?,?,?,?)`;
    const SQLdata = [
      req.data.result[0].U_IDX,
      req.body.C_CATEGORY,
      req.body.C_CATE_DETAIL,
      req.body.C_NAME,
      req.body.C_INTRO,
      req.body.C_AREA,
    ];
    // console.log(req.body);
    connection.query(insertSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
  getAllCateClub: async (req, res) => {
    const selectSQL = `SELECT * FROM CLUB_TABLE WHERE C_CATEGORY =? ORDER BY RAND() LIMIT 6`;
    const SQLData = [req.query.data];
    // console.log(SQLData);
    connection.query(selectSQL, SQLData, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  },
};
module.exports = homeAddCtrl;
