const homeAddCtrl = require("../controllers/homeAddCtrl");
const router = require("express").Router();
const multer = require("multer");

// 홈화면 라우터
router.get("/getTopClubList", homeAddCtrl.getTopClubList);
router.get("/getCateClubList", homeAddCtrl.getCateClubList);
router.get("/getSliderModalInfo", homeAddCtrl.getSliderModalInfo);

module.exports = router;
