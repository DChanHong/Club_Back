const homeAddCtrl = require("../controllers/homeAddCtrl");
const router = require("express").Router();
const multer = require("multer");
const authCheck = require("../middleware/authCheck");

/**
 * @swagger
 * tags:
 *  name: homePage
 *  description : 홈 페이지 api
 */

// 홈화면 라우터
/**
 * @swagger
 *
 * paths:
 *   /api/home/club/top/list:
 *     get:
 *       summary: "참여자가 가장 많은 크럽 리스트를 가져온댜."
 *       description: "GET 메소드를 사용한다."
 *       tags: [homePage]
 *       parameters:
 *         - in: query
 *           name: topList
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
 *                           { "C_IDX": 1, "U_IDX":1, "C_CATEGORY":"스포츠", "C_CATE_DETAIL":"축구" , "C_INTRO":"부산에서 축구 같이 하실 분 들어오세요" ,"c_NAME":"축동", "C_AREA":"부산 북구", "C_IMAGE":"son.png", "C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" },
 *                         ]
 */
router.get("/club/top/list", homeAddCtrl.getTopClubList);
//-> 인기 클럽 리스트를 불러온다.

/**
 * @swagger
 *
 * paths:
 *   /api/home/club/category/limit/list:
 *     get:
 *       summary: "전달받은 카테고리의 동아리를 랜덤으로 6개 select한다."
 *       description: "GET 메소드를 사용한다."
 *       tags: [homePage]
 *       parameters:
 *         - in: query
 *           name: categoryRandList
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
 *                           { "C_IDX": 1, "U_IDX":1, "C_CATEGORY":"스포츠", "C_CATE_DETAIL":"축구" , "C_INTRO":"부산에서 축구 같이 하실 분 들어오세요" ,"c_NAME":"축동", "C_AREA":"부산 북구", "C_IMAGE":"son.png", "C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" },
 *                         ]
 */
router.get("/club/category/limit/list", homeAddCtrl.getCateClubList);
//-> 카테고리별로 6개씩만 동아리를 불러온다.

/**
 * @swagger
 *
 * paths:
 *   /api/home/club/modal/information:
 *     get:
 *       summary: "선택한 동아리의 정보를 모달창으로 보여준다."
 *       description: "GET 메소드를 사용한다."
 *       tags: [homePage]
 *       parameters:
 *         - in: query
 *           name: showClubModal
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
 *                           { "C_IDX": 1, "U_IDX":1, "C_CATEGORY":"스포츠", "C_CATE_DETAIL":"축구" , "C_INTRO":"부산에서 축구 같이 하실 분 들어오세요" ,"c_NAME":"축동", "C_AREA":"부산 북구", "C_IMAGE":"son.png", "C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" },
 *                         ]
 */
router.get("/club/modal/information", homeAddCtrl.getSliderModalInfo);
//-> 카루셀 클릭시 모달창에 넣어줄 해당 동아리 정보

/**
 * @swagger
 *
 * paths:
 *   /api/home/new-club:
 *     post:
 *       summary: "생성 동아리 정보를 저장한다."
 *       description: "POST 를 사용하여 body에 값을 담아 보내준다."
 *       tags: [homePage]
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
 *                           { "U_IDX": "1", "C_CATEGORY":"스포츠", "C_CATE_DETAIL":"축구", "C_NAME":"레너드" , "C_INTRO":"축구해요","C_AREA":"부산 진구" },
 
 *                         ]
 */
router.post("/new-club", authCheck, homeAddCtrl.insertNewClubInfo);
// router.get("/getAllCateClub", homeAddCtrl.getAllCateClub);
module.exports = router;
