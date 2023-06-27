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

// 소켓 disconnect시 채팅 내역 한번에 인설트
router.post("/post/context/chatting", async (req, res) => {
  try {
    const message = req.body;
    console.log(message);
    console.log("실행된");
  } catch (error) {
    console.log(error);
  }
});

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

module.exports = router;
