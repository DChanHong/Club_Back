const homeAddCtrl = require("../controllers/homeAddCtrl");
const router = require("express").Router();
const multer = require("multer");
const authCheck = require("../middleware/authCheck");

// 홈화면 라우터
router.get("/club/top/list", homeAddCtrl.getTopClubList);
//-> 인기 클럽 리스트를 불러온다.

router.get("/club/category/limit/list", homeAddCtrl.getCateClubList);
//-> 카테고리별로 6개씩만 동아리를 불러온다.

router.get("/club/modal/information", homeAddCtrl.getSliderModalInfo);
//-> 카루셀 클릭시 모달창에 넣어줄 해당 동아리 정보

router.post("/new-club", authCheck, homeAddCtrl.insertNewClubInfo);
// router.get("/getAllCateClub", homeAddCtrl.getAllCateClub);
module.exports = router;
