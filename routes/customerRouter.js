const customerCtrl = require("../controllers/customerCtrl");
// const myPageCtrl = require("../controllers/myPageCtrl");

const router = require("express").Router();
const multer = require("multer");
const authCheck = require("../middleware/authCheck");

router.post("/user/data/injection", customerCtrl.insertCustomer);
// 회원가입 데이터를 넣어준다.

router.post("/check-id", customerCtrl.checkID);
// 유저 id 확인해준다.

router.post("/login", customerCtrl.checkLogin);
// 유저가 로그인해서 토큰 발급해준다.

router.post("/logout", customerCtrl.logout);
//유저가 로그아웃한다.

// 마이페이지 -> 로그인 인증 필요
router.get("/getuserInfo", authCheck, customerCtrl.getUser);

// ----------------------------------------
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
