const clubDetailCtrl = require("../controllers/clubDetailCtrl");
const router = require("express").Router();
const authCheck = require("../middleware/authCheck");

router.get("/getClubDetailUserList", clubDetailCtrl.getClubDetailUserList);
router.get("/getClubDetailInfo", clubDetailCtrl.getClubDetailInfo);
router.get("/getClubText", clubDetailCtrl.getClubText);

router.get("/clubJoinUserCheck", authCheck, clubDetailCtrl.clubJoinUserCheck);
router.post("/JoinClub", authCheck, clubDetailCtrl.JoinClub);
router.post("/LeaveClub", authCheck, clubDetailCtrl.LeaveClub);
module.exports = router;
