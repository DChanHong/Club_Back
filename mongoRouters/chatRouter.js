const express = require("express");
const router = express.Router();
const chatCtrl = require("../mongoControllers/chatCtrl");

//채팅 내역 인설트
router.post("/insertchatting", async (req, res) => {
  try {
    const message = req.body;
    // console.log(message);
    await chatCtrl.insertChat(message);
    res.status(200).send("message inserted");
  } catch (error) {
    console.log(error);
  }
});

// // 소켓 디스커넥트 시 채팅 내역 전부 인설트
// router.post("/insertAllchatting", async (req, res) => {
//   try {
//     const message = req.body;
//     // console.log(message);
//     await chatCtrl.insertAllChat(message);
//     res.status(200).send("message All inserted");
//   } catch (error) {
//     console.log(error);
//   }
// });

//모든 채팅 내역 불러오기
router.get("/selectAllChatting", async (req, res) => {
  // console.log(req.query.C_IDX);
  const clubData = req.query.C_IDX;
  try {
    const result = await chatCtrl.selectAllChat(clubData);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

// 채팅 내역 가져오기

module.exports = router;
