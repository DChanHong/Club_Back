const customerCtrl = require("../controllers/customerCtrl");
// const myPageCtrl = require("../controllers/myPageCtrl");

const router = require("express").Router();
const multer = require("multer");
const authCheck = require("../middleware/authCheck");

/**
 *
 * @swagger
 * tags:
 *  name: loginSignPage
 *  description: 로그인 및 회원가입 페이지 api
 */

/**
 * @swagger
 *
 * paths:
 *   /api/customer/user/data/injection:
 *     post:
 *       summary: "mysql에 INSERT할 데이터를 넘겨준다."
 *       description: "POST 를 사용하여 body에 값을 담아 보내준다."
 *       tags: [loginSignPage]
 *       parameters:
 *         - in: body
 *           name: response.body
 *       responses:
 *         "200":
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                            email: {type: string}
 *                            password: {type: string}
 *                            name: {type: string}
 *                            gender: {type: string}
 *                            birth: {type: string}
 *                       example:
 *                         [
 *                           { "email": "asd1@naver.com", "password":1, "name":"홍길동", "gender":"남자" , "birth":"1999-12-12" },
 
 *                         ]
 */
router.post("/user/data/injection", customerCtrl.insertCustomer);
// 회원가입 데이터를 넣어준다.

/**
 *
 * @swagger
 * tags:
 *  name: loginSignPage
 *  description: 로그인 및 회원가입 페이지 api
 */

/**
 * @swagger
 *
 * paths:
 *   /api/customer/check-id:
 *     post:
 *       summary: "mysql에 로그인 내역을 확인하여 중복 체크를 해준다."
 *       description: "POST 를 사용하여 body에 값을 담아 보내준다."
 *       tags: [loginSignPage]
 *       parameters:
 *         - in: body
 *           name: response.body
 *       responses:
 *         "200":
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                            email: {type: string}
 *                       example:
 *                         [
 *                           { data: true, message: "사용 가능한 아이디입니다." },
 *                         ]
 */
router.post("/check-id", customerCtrl.checkID);
// 유저 id 확인해준다.

/**
 * @swagger
 *
 * paths:
 *   /api/customer/check-id:
 *     post:
 *       summary: "mysql에 로그인 내역을 확인하여 중복 체크를 해준다."
 *       description: "POST 를 사용하여 body에 값을 담아 보내준다."
 *       tags: [loginSignPage]
 *       parameters:
 *         - in: body
 *           name: response.body
 *       responses:
 *         "200":
 *           description: Success
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                       example:
 *                         [
 *                           { data: true, message: "사용 가능한 아이디입니다." },
 *                         ]
 */
router.post("/login", customerCtrl.checkLogin);
// 유저가 로그인해서 토큰 발급해준다.

/**
 * @swagger
 *
 * paths:
 *   /api/customer/logout:
 *     post:
 *       summary: "헤더의 쿠키를 삭제시킨다."
 *       description: "POST 를 사용하여 요청"
 *       tags: [loginSignPage]
 *       parameters:
 *         - in: body
 *           name: response.body
 */
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

/**
 * @swagger
 *
 * paths:
 *   /api/customer/upload:
 *     post:
 *       summary: "고객 프로필 사진을 바꿔준다."
 *       description: "POST 를 사용하여 body에 값을 담아 보내준다."
 *       tags: [loginSignPage]
 *       parameters:
 *         - in: body
 *           name: response.body
 *       responses:
 *         "200":
 *           description: Success
 *           content:
 *             multipart/form-data:
 *               schema:
 *                 type: object
 *                 properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                       example:
 *                         [
 *                           { originalname: "son.png", email: "asd1@naver.com" },
 *                         ]
 */
router.post(
  "/upload",
  authCheck,
  upload.single("file"),
  customerCtrl.uploadImage
);

module.exports = router;
