const clubDetailCtrl = require("../controllers/clubDetailCtrl");
const hostCheck = require("../middleware/hostCheck");

const router = require("express").Router();
router.get("/getClubDetailUserList", clubDetailCtrl.getClubDetailUserList);
router.get("/getClubDetailInfo", clubDetailCtrl.getClubDetailInfo);
router.get("/getClubText", clubDetailCtrl.getClubText);
module.exports = router;
