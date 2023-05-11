const searchPageCtrl = require("../controllers/searchPageCtrl");
const router = require("express").Router();

// 서치 페이지 라우터
router.get("/selectSearchClub", searchPageCtrl.selectSearchClub);

module.exports = router;
