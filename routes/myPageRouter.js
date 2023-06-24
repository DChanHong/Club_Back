const authCheck = require("../middleware/authCheck");
const myPageCtrl = require("../controllers/myPageCtrl");
const router = require("express").Router();

router.get("/user/withdrawal", authCheck, myPageCtrl.withdrawalUser);
// 유저가 회원 탈퇴하다.
router.get("/participation/club/list", authCheck, myPageCtrl.getMyAttClubList);
// 내가 참여중인 동아리리스트를 불러온다.
router.get("/host/club/list", authCheck, myPageCtrl.getMyHostClubList);
// 내가 호스트인 동아리 리스트

router.get("/user/information", authCheck, myPageCtrl.getUser);
// 마이페이지에 유저 정보를 가져온다.
module.exports = router;
