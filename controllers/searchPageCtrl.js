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
  selectCategoryPage: async (req, res) => {
    const OFFSET = (Number(req.query.pageNumber) - 1) * 6;
    const SQLdata = [req.query.Category, OFFSET];

    // console.log(SQLdata);
    const selectSQL = `SELECT *FROM CLUB_TABLE WHERE C_CATEGORY =? ORDER BY C_IDX ASC LIMIT 6 OFFSET ?;`;

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  selectAllClub: async (req, res) => {
    const selectSQL =
      "SELECT *FROM CLUB_TABLE ORDER BY C_IDX ASC LIMIT 6 OFFSET ?";
    const pageData = Number(req.query.page);
    const SQLData = [pageData * 6];
    connection.query(selectSQL, SQLData, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },

  testSkeleton: async (req, res) => {
    const selectSQL = "SELECT *FROM CLUB_TABLE ORDER BY C_IDX ASC LIMIT 10 ";

    connection.query(selectSQL, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
};

module.exports = searchPageCtrl;
