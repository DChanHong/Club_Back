const homeAddCtrl = require("../controllers/homeAddCtrl");
const router = require("express").Router();
const multer = require("multer");
const authCheck = require("../middleware/authCheck");

// 홈화면 라우터
router.get("/getTopClubList", homeAddCtrl.getTopClubList);
router.get("/getCateClubList", homeAddCtrl.getCateClubList);
router.get("/getSliderModalInfo", homeAddCtrl.getSliderModalInfo);

router.post("/insertNewClubInfo", authCheck, homeAddCtrl.insertNewClubInfo);
router.get("/getAllCateClub", homeAddCtrl.getAllCateClub);
module.exports = router;
