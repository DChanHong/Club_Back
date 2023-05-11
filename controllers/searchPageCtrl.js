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
      res.send(rows);
    });
  },
};

module.exports = searchPageCtrl;
