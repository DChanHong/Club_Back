const customerCtrl = require("../controllers/customerCtrl");
const myPageCtrl = require("../controllers/myPageCtrl");

const router = require("express").Router();
const multer = require("multer");
const authCheck = require("../middleware/authCheck");

router.post("/", customerCtrl.insertCustomer);
router.post("/checkID", customerCtrl.checkID);
router.post("/login", customerCtrl.checkLogin);
router.post("/logout", customerCtrl.logout);
// router.get("/accesstoken", customerCtrl.accessToken);

// 마이페이지 -> 로그인 인증 필요
router.get("/getuserInfo", authCheck, customerCtrl.getUser);
router.get("/getMyAttClubList", authCheck, myPageCtrl.getMyAttClubList);
router.get("/getMyHostClubList", authCheck, myPageCtrl.getMyHostClubList);

//이미지 업로드
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image/");
  },
  filename: (req, file, cb) => {
    const newFileName = file.originalname;
    cb(null, newFileName);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/upload",
  authCheck,
  upload.single("file"),
  customerCtrl.uploadImage
);

module.exports = router;
