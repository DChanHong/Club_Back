const clubDetailCtrl = require("../controllers/clubDetailCtrl");
const router = require("express").Router();
const authCheck = require("../middleware/authCheck");

router.get("/getClubDetailUserList", clubDetailCtrl.getClubDetailUserList);
router.get("/getClubDetailInfo", clubDetailCtrl.getClubDetailInfo);
router.get("/getClubText", clubDetailCtrl.getClubText);

router.get("/clubJoinUserCheck", authCheck, clubDetailCtrl.clubJoinUserCheck);
router.post("/JoinClub", authCheck, clubDetailCtrl.JoinClub);
router.post("/LeaveClub", authCheck, clubDetailCtrl.LeaveClub);

router.post("/makeClubSchedule", authCheck, clubDetailCtrl.makeClubSchedule);
router.get("/callClubSchedule", authCheck, clubDetailCtrl.callClubSchedule);
router.get("/getContext", authCheck, clubDetailCtrl.getContext);

router.get("/getMyIdx", authCheck, clubDetailCtrl.getMyIdx);

router.post("/insertContext", authCheck, clubDetailCtrl.insertContext);
router.get("/getHostInfo", clubDetailCtrl.getHostInfo);

router.post("/deletSchedule", clubDetailCtrl.deletSchedule);
router.get("/getUserName", authCheck, clubDetailCtrl.getUserName);

router.post("/deleteContext", authCheck, clubDetailCtrl.deleteContext);

module.exports = router;
