const clubDetailCtrl = require("../controllers/clubDetailCtrl");
const router = require("express").Router();
const authCheck = require("../middleware/authCheck");
const multer = require("multer");
/**
 *
 * @swagger
 * tags :
 *  name: clubDetailPage
 *  description: 클럽 입장 시 페이지 api
 */

/**
 * @swagger
 *
 * paths:
 *   /api/club/user/entrance/list:
 *     get:
 *       summary: "동아리의 유저 참가자 정보를 불러온다."
 *       description: "GET 메소드를 사용한다."
 *       tags: [clubDetailPage]
 *       parameters:
 *         - in: query
 *           name: getClubDetailUserList
 *           schema:
 *             type: Object
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
 *                            HOSTNAME: {type: integer}
 *                            C_CATEGORY: {type: integer}
 *                            C_CATE_DETAIL: {type: string}
 *                            C_NAME: {type: string}
 *                            C_INTRO:{type: string}
 *                            C_AREA: {type: string}
 *                            C_IMAGE: {type: string}
 *                            C_TEXT: {type: string}
 *                            C_IDX: {type: number}
 *                            U_IDX: {type: number}
 *                            U_NAME: {type: string}
 *                       example:
 *                         [
 *                           { "HOSTNAME": "레너드", "C_CATEGORY":"스포츠", "C_CATE_DETAIL":"축구", "C_NAME":"축구동아리요" , "C_INTRO":"부산에서 축구 같이 하실 분 들어오세요" ,"C_AREA":"부산 동구",  "C_IMAGE":"background.png", "C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" ,"C_IDX":1, "U_IDX":1,"U_NAME":"케너드"},
 *                         ]
 */
router.get("/user/entrance/list", clubDetailCtrl.getClubDetailUserList);
// -> 클럽에 참여한 유저 리스트를 들고온다. SELECT / getClubDetailUserList
//  /user/entrance/list

/**
 * @swagger
 *
 * paths:
 *   /api/club/information/title/image/etc:
 *     get:
 *       summary: "동아리의 정보(이지미,제목,소개 등)을 들고온다."
 *       description: "GET 메소드를 사용한다."
 *       tags: [clubDetailPage]
 *       parameters:
 *         - in: query
 *           name: getClubDetailUserList
 *           schema:
 *             type: Object
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
 *                            C_IDX: {type: integer}
 *                            U_IDX: {type: integer}
 *                            C_CATEGORY: {type: string}
 *                            C_CATE_DETAIL: {type: string}
 *                            C_NAME:{type: string}
 *                            C_INTRO: {type: string}
 *                            C_AREA: {type: string}
 *                            C_IMAGE: {type: string}
 *                            C_TEXT: {type: string}
 *                       example:
 *                         [
 *                          { "C_IDX": 1, "U_IDX":1, "C_CATEGORY":"스포츠", "C_CATE_DETAIL":"축구" , "C_INTRO":"부산에서 축구 같이 하실 분 들어오세요" ,"c_NAME":"축동", "C_AREA":"부산 북구", "C_IMAGE":"son.png", "C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" },
 *                         ]
 */
router.get("/information/title/image/etc", clubDetailCtrl.getClubDetailInfo);
// -> 클럽의 정보(이지미,제목,소개 등)을 들고온다. SELECT / getClubDetailInfo
//  /information/title/image/etc

/**
 * @swagger
 *
 * paths:
 *   /api/club/information/notice:
 *     get:
 *       summary: "동아리 공지사항 정보를 들고온다."
 *       description: "GET 메소드를 사용한다."
 *       tags: [clubDetailPage]
 *       parameters:
 *         - in: query
 *           name: getClubDetailUserList
 *           schema:
 *             type: Object
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
 *                            C_TEXT: {type: string}
 *                       example:
 *                         [
 *                          { "C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" },
 *                         ]
 */
router.get("/information/notice", clubDetailCtrl.getClubText);
// -> 클럽의 공지사항을 들고온다. SELECT / getClubText
//  /information/notice

/**
 * @swagger
 *
 * paths:
 *   /api/club/user/join-check:
 *     get:
 *       summary: "동아리 참여자인지 확인한다."
 *       description: "GET 메소드를 사용한다."
 *       tags: [clubDetailPage]
 *       parameters:
 *         - in: query
 *           name: clubJoinUserCheck
 *           schema:
 *             type: Object
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
 *                          { data: true },
 *                         ]
 */
router.get("/user/join-check", authCheck, clubDetailCtrl.clubJoinUserCheck);
// -> 이 클랍에 가입한 사람인지 체크해준다. SELECT / clubJoinUserCheck
// /user/join-check

/**
 * @swagger
 *
 * paths:
 *   /api/club/user/join-club:
 *     post:
 *       summary: "동아리에 가입한다.."
 *       description: "POST 메소드를 사용한다."
 *       tags: [clubDetailPage]
 *       parameters:
 *         - in: body
 *           name: getClubDetailUserList
 *           schema:
 *             type: Object
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
 *                            result
 *                         ]
 */
router.post("/user/join-club", authCheck, clubDetailCtrl.JoinClub);
// -> 클럽에 가입한다. + 참여리스트에 추가해준다. INSERT /JoinClub
// /user/join-club

/**
 * @swagger
 *
 * paths:
 *   /api/club/delete/leave-club:
 *     delete:
 *       summary: "동아리에 탈퇴한다."
 *       description: "DELETE 메소드를 사용한다."
 *       tags: [clubDetailPage]
 *       parameters:
 *         - in: body
 *           name: getClubDetailUserList
 *           schema:
 *             type: Object
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
 *                            result
 *                         ]
 */
router.delete("/delete/leave-club", authCheck, clubDetailCtrl.LeaveClub);
// -> 클럽 탈퇴한다. DELETE / LeaveClub
// -> /leave-club

/**
 * @swagger
 *
 * paths:
 *   /api/club/i-schedule:
 *     post:
 *       summary: "동아리 일정을 추가한다."
 *       description: "POST 메소드를 사용한다."
 *       tags: [clubDetailPage]
 *       parameters:
 *         - in: body
 *           name: getClubDetailUserList
 *           schema:
 *             type: Object
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
 *                            result
 *                         ]
 */
router.post("/i-schedule", authCheck, clubDetailCtrl.makeClubSchedule);
// -> 동아리 일정을 만든다. INSERT / makeClubSchedule
// /i-schedule

/**
 * @swagger
 *
 * paths:
 *   /api/club/schedule/information:
 *     get:
 *       summary: "동아리 일정 정보를 가져온다."
 *       description: "GET 메소드를 사용한다."
 *       tags: [clubDetailPage]
 *       parameters:
 *         - in: body
 *           name: callClubSchedule
 *           schema:
 *             type: Object
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
 *                            { "S_IDX": 5, "S_DATE":2, "S_HEAD":"만나요오오", "S_SUBH":"만나요오오2222" , "S_LIKE":0 ,"S_NOW":"축동", "U_NAME":"레너드", "U_IMAGE":"son.png" }
 *                         ]
 */
router.get("/schedule/information", authCheck, clubDetailCtrl.callClubSchedule);
// -> 클럽에 등록된 스케쥴 정보를 가져온다. SELECT / callClubSchedule
// /schedule/information/

router.get(
  "/schedule/information/context",
  authCheck,
  clubDetailCtrl.getContext
);
// -> 일정에 등록된 댓들 정보를 들고온다. SELECT / getContext
//  /schedule/information/context

router.get("/u-idx", authCheck, clubDetailCtrl.getMyIdx);
// -> 쿼리문 아님! 쿠키에 저장된 내 U_IDX를 들고온다. / getMyIdx
// /u-idx

router.post("/i-shchedule/context", authCheck, clubDetailCtrl.insertContext);
// -> 일정에 댓글을 등록한다. INSERT / getMyIdx
// /i-shchedule/context

router.get("/host/information", clubDetailCtrl.getHostInfo);
// -> 클럽의 호스트정보를 불러온다. SELECT / getHostInfo
// /host/information

router.delete("/delete/schedule", clubDetailCtrl.deletSchedule);
// -> 클럽에 등록된 일정을 삭제한다. DELETE / deletSchedule
// /d-schedule/

router.get("/my-name", authCheck, clubDetailCtrl.getUserName);
// -> 쿠키를 이용해 로그인된 내 이름을 가져온다. SELECT / getUserName
// -> /my-name

router.delete(
  "/delete/schedule/context",
  authCheck,
  clubDetailCtrl.deleteContext
);
// -> 일정에 등록된 댓글을 샂게한다. DELETE / deleteContext
// -> /delete/schedule/context

router.get("/notice/text", authCheck, clubDetailCtrl.selectNotice);
// -> 공지사항을 불러온다 . SELECT / selectNotice
// /notice/text

router.get("/host/check-info", authCheck, clubDetailCtrl.selectHost);
// -> 내가 로그인한 아이디의 토큰을 보내서 host인지 아닌지 확인해서 보내준다. SELECT / selectHost
// /host/check-info

router.put("/notice/host/text", clubDetailCtrl.updateNotice);
// -> 클럽에 방장이 공지사항을 업데이트한다. UPDATE /  updateNotice
// /notice/host/text

router.get("/test/club", clubDetailCtrl.getClub);
//infiniteScroll 테스트용 클럽데이터 가져오기

// 동아리 백그라운드 업로드
const strage = multer.diskStorage({
  destination: (req, file, db) => {
    db(null, "image/background/");
  },
  filename: (req, file, cb) => {
    const newFileNmae = file.originalname;
    cb(null, newFileNmae);
  },
});
const upload = multer({ storage: strage });

router.post(
  "/background/image/upload",
  upload.single("file"),
  clubDetailCtrl.uploadClubBackgroundImage
);

module.exports = router;
