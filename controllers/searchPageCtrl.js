const connection = require("../dbConfig");

const searchPageCtrl = {
  // 검색 후 보여줄 동아리 리스트
  selectSearchClub: async (req, res) => {
    const data = "%" + req.query.data + "%";
    // console.log(req.query.data, data);
    const selectSQL = `SELECT *FROM CLUB_TABLE WHERE C_NAME LIKE ? `;
    const sqlData = [data];
    // console.log(data);
    connection.query(selectSQL, sqlData, (error, rows) => {
      if (error) throw error;
      res.status(200).send(rows);
    });
  },
  // 사이드 바에 카테고리별 클럽 보여주기 select
  selcectCategoryClub: async (req, res) => {
    // console.log(req.query.data);
    const SQLData = [req.query.data];
    const seletSQL = `SELECt *FROM CLUB_TABLE WHERE C_CATEGORY=?`;

    connection.query(seletSQL, SQLData, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
};

module.exports = searchPageCtrl;
