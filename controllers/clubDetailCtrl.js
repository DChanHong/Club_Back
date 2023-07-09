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
      res.status(200).send(result);
    });
  },
  getClubDetailInfo: async (req, res) => {
    const selectSQL = `SELECT * FROM CLUB_TABLE WHERE C_IDX =?`;
    const SQLdata = [req.query.data];
    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  getClubText: async (req, res) => {
    // console.lo("일단 여기까지 옴");
    const selectSQL = `SELECT C_TEXT ,U_IDX FROM CLUB_TABLE WHERE C_IDX =?`;
    const SQLdata = [req.query.data];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  // 동아리 참여자인지 아인지 체크
  clubJoinUserCheck: async (req, res) => {
    // 동아리 참여자가 맞으면 U_IDX 존재 , 아니면 null값
    const selectSQL = `SELECT *FROM ATTEND_USER_TABLE WHERE C_IDX=? AND U_IDX =? `;

    const SQLdata = [Number(req.query.data), req.data.result[0].U_IDX];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      else {
        if (result.length === 1) {
          res.status(200).json({ data: true });
        } else {
          res.status(200).json({ data: false });
        }
      }
    });
  },
  // 동아리 참여하기
  JoinClub: async (req, res) => {
    const insertSQL = " INSERT INTO ATTEND_USER_TABLE VALUES(?,?)"; //C_IDX ,U_IDX

    const insertData = [req.body.data, req.data.result[0].U_IDX];
    connection.query(insertSQL, insertData, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  // 동아리 탈퇴하기
  LeaveClub: async (req, res) => {
    const deleteSQL =
      "DELETE FROM ATTEND_USER_TABLE WHERE C_IDX =? AND U_IDX =?";

    const SQLdata = [req.body.data, req.data.result[0].U_IDX];
    connection.query(deleteSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  // 동아리 일정 생성하기
  makeClubSchedule: async (req, res) => {
    const insertSQL = `INSERT INTO CLUB_SCHEDULE_TABLE(U_IDX,C_IDX,S_DATE,S_HEAD,S_SUBH) VALUES (?,?,?,?,?)`;

    const SQLdata = [
      req.data.result[0].U_IDX,
      Number(req.body.C_IDX),
      req.body.S_DATE,
      req.body.S_HEAD,
      req.body.S_SUBH,
    ];
    // console.log(SQLdata);
    connection.query(insertSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },

  // 동아리 일정 불러오기
  callClubSchedule: async (req, res) => {
    const selectSQL = ` 
    SELECT T1.S_IDX,T1.S_DATE,T1.S_HEAD,T1.S_SUBH,T1.S_LIKE,T1.S_NOW, T2.U_IDX, T2.U_NAME ,T2.U_IMAGE FROM
    (SELECT *FROM CLUB_SCHEDULE_TABLE WHERE C_IDX=?) T1
    JOIN USER_TABLE T2 WHERE T1.U_IDX = T2.U_IDX
`;
    const SQLdata = [req.query.C_IDX];
    // console.log(SQLdata);
    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  // 댓글불러오기
  getContext: async (req, res) => {
    const selectSQL = `SELECT T1.CO_IDX, T1.S_IDX , T1.U_IDX, T1.CO_CONTEXT ,T2.U_NAME FROM
    (SELECT *FROM CLUB_SCHEDULE_CONTEXT_TABLE WHERE S_IDX =?) T1 
    JOIN USER_TABLE T2 
    WHERE T1.U_IDX = T2.U_IDX`;
    const SQLdata = [req.query.S_IDX];
    // console.log(SQLdata);

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
      // console.log(result);
    });
  },
  //댓글 입력
  insertContext: async (req, res) => {
    // console.log(req.data.result[0].U_IDX, req.body);
    const insertSQL =
      "INSERT INTO CLUB_SCHEDULE_CONTEXT_TABLE(S_IDX,U_IDX,CO_CONTEXT) VALUES(?,?,?)";
    const SQLdata = [
      req.body.S_IDX.S_IDX,
      req.data.result[0].U_IDX,
      req.body.CO_CONTEXT,
    ];
    connection.query(insertSQL, SQLdata, (error, result) => {
      if (error) throw error;
      else {
        // console.log(result.insertId);
        res.status(200).json({ id: result.insertId });
      }
    });
  },
  // 호스트 정보 불러오기
  getHostInfo: async (req, res) => {
    // const data = req.query;
    // console.log(data);
    const selectSQL =
      "SELECT T2.U_IDX ,T2.U_NAME, T2.U_IMAGE FROM (SELECT U_IDX FROM CLUB_TABLE WHERE C_IDX=?) T1 JOIN USER_TABLE T2 WHERE T1.U_IDX = T2.U_IDX";
    const SQLdata = [req.query.C_IDX];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  // 내 유저IDX 불러오기
  getMyIdx: async (req, res) => {
    const data = req.data.result[0].U_IDX;
    res.status(200).json({ data: data });
  },
  deletSchedule: async (req, res) => {
    const deleteSQL = "DELETE FROM CLUB_SCHEDULE_TABLE  WHERE S_IDX =?";
    // console.log(req.body);
    const SQLdata = [req.body.S_IDX];
    connection.query(deleteSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).json({ data: "삭제 완료" });
    });
  },
  getUserName: async (req, res) => {
    const data = req.data.result[0].U_IDX;
    const selectSQL = "SELECT U_NAME FROM USER_TABLE WHERE U_IDX=?";
    const SQLdata = [data];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  deleteContext: async (req, res) => {
    const deleteSQL = "DELETE FROM CLUB_SCHEDULE_CONTEXT_TABLE WHERE CO_IDX=?";
    const SQLdata = [req.body.CO_IDX];
    console.log(SQLdata);
    connection.query(deleteSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200);
    });
  },
  // 공지 불러오기
  selectNotice: async (req, res) => {
    const selectSQL = "SELECT C_TEXT FROM CLUB_TABLE WHERE C_IDX =?";
    const SQLdata = [req.query.C_IDX];
    // console.log(SQLdata);
    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      res.status(200).send(result);
    });
  },
  //호스트 불러오기
  selectHost: async (req, res) => {
    const selectSQL = "SELECT * FROM CLUB_TABLE WHERE C_IDX =? AND U_IDX=?";

    const SQLdata = [req.query.data, req.data.result[0].U_IDX];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      else {
        if (result.length > 0) {
          res.status(200).json({ data: "host" });
        } else {
          res.status(200).json({ data: "NO" });
        }
      }
    });
  },
  // Notice 업데이트
  updateNotice: async (req, res) => {
    const updateSQL = "UPDATE CLUB_TABLE SET C_TEXT=? WHERE C_IDX=?";

    const SQLdata = [req.body.params.C_TEXT, req.body.params.C_IDX];

    connection.query(updateSQL, SQLdata, (error, result) => {
      if (error) throw error;
      else {
        res.status(200).json({ data: "update Success" });
      }
    });
  },
  //무한 스크롤 테스트용 쿼리
  getClub: async (req, res) => {
    const selectSQL =
      "SELECT * FROM CLUB_TABLE ORDER BY C_IDX ASC LIMIT 3 OFFSET ?";
    const pageData = Number(req.query.page);

    const SQLdata = [pageData * 3];

    connection.query(selectSQL, SQLdata, (error, result) => {
      if (error) throw error;
      else {
        res.status(200).send(result);
      }
    });
  },
  uploadClubBackgroundImage: async (req, res) => {
    const updateBackImageSQL = "UPDATE CLUB_TABLE SET C_IMAGE=? WHERE C_IDX=?";
    // console.log(req.file, req.body);
    const SQLData = [req.file.originalname, req.body.C_IDX];
    // console.log(SQLData);

    connection.query(updateBackImageSQL, SQLData, (error, result) => {
      if (error) throw error;
      else {
        res.status(200).json({ message: "img변경 완료" });
      }
    });
  },
};

module.exports = clubDetailCtrl;
