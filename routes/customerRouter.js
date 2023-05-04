const customerCtrl = require("../controllers/customerCtrl");
const router = require("express").Router();
const multer = require("multer");
// import { authCheck } from '../middleware/authCheck';
const authCheck = require("../middleware/authCheck");

router.get("/", customerCtrl.getCustomer);
router.post("/", customerCtrl.insertCustomer);
router.post("/checkID", customerCtrl.checkID);
router.post("/login", customerCtrl.checkLogin);
router.get("/accesstoken", customerCtrl.accessToken);

// 로그인 인증 필요
router.get("/getuserInfo", authCheck, customerCtrl.getUser);

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
