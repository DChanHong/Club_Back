const authCheck = require("../middleware/authCheck");
const myPageCtrl = require("../controllers/myPageCtrl");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: mypage
 *   description: 마이페이지 api
 */

/**
 * @swagger
 *
 * paths:
 *  /api/mypage/user/withdrawal:
 *    put:
 *      summary: "유저가 회원 탈퇴한다."
 *      description: "PUT 방식으로 정보를 받으며, 데이터 정보 보관을 위해 DELETE가 아닌 UPDATE를 한다."
 *      tags: [mypage]
 *      parameters:
 *        - in: body
 *          name:
 *          schema:
 *          type: Object
 *          description: 회원 탈퇴를 위해 토큰을 이용하여 U_IDX를 전달받음
 *          example:
 *             {U_IDX : 1 }
 *
 *      responses:
 *        "200":
 *          description:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                          [
 *                            { data: "탈퇴 완료"},
 *                          ]
 */
router.put("/user/withdrawal", authCheck, myPageCtrl.withdrawalUser);

/**
 * @swagger
 *
 * paths:
 *   /api/mypage/participation/club/list:
 *     get:
 *       summary: "내가 참여중인 동아리리스트를 불러온다."
 *       description: "GET 방식을 사용하여 파라메타값을 받아오며, response객체에 정보를 담아 보내준다."
 *       tags: [mypage]
 *       parameters:
 *         - in: query
 *           name: U_EMAIL
 *           schema:
 *             type: Object
 *           description: 쿠키에 담겨진 유저정보를 해독하여 U_EMAIL을 받는다.
 *           example:
 *               U_EMAIL: "asd1@naver.com"
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
 *                            C_INTRO: {type: string}
 *                            C_AREA: {type: string}
 *                            C_IMAGE: {type: string}
 *                            C_TEXT: {type: string}
 *                       example:
 *                         [
 *                           { "C_IDX": 1, "U_IDX":1, "C_CATEGORY":"스포츠", "C_CATE_DETAIL":"축구" , "C_INTRO":"부산에서 축구 같이 하실 분 들어오세요" , "C_AREA":"부산 북구", "C_IMAGE":"son.png", "C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" },
 
 *                         ]
 */
router.get("/participation/club/list", authCheck, myPageCtrl.getMyAttClubList);
// 내가 참여중인 동아리리스트를 불러온다.

/**
 * @swagger
 *
 * paths:
 *   /api/mypage/host/club/list:
 *     get:
 *       summary: "내가 방장인 동아리리스트를 불러온다."
 *       description: "GET 방식을 사용하여 파라메타값을 받아오며, response객체에 정보를 담아 보내준다."
 *       tags: [mypage]
 *       parameters:
 *         - in: query
 *           name: U_EMAIL
 *           schema:
 *             type: Object
 *           description: 쿠키에 담겨진 유저정보를 해독하여 U_EMAIL을 받는다.
 *           example:
 *               U_EMAIL: "asd1@naver.com"
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
 *                            C_INTRO: {type: string}
 *                            C_AREA: {type: string}
 *                            C_IMAGE: {type: string}
 *                            C_TEXT: {type: string}
 *                       example:
 *                         [
 *                           { "C_IDX": 1, "U_IDX":1, "C_CATEGORY":"스포츠", "C_CATE_DETAIL":"축구" , "C_INTRO":"부산에서 축구 같이 하실 분 들어오세요" , "C_AREA":"부산 북구", "C_IMAGE":"son.png", "C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" },
 
 *                         ]
 */
router.get("/host/club/list", authCheck, myPageCtrl.getMyHostClubList);
// 내가 호스트인 동아리 리스트

/**
 * @swagger
 *
 * paths:
 *   /api/mypage/user/information:
 *     get:
 *       summary: "나의 개인정보를 불러온다."
 *       description: "GET 방식을 사용하여 파라메타값을 받아오며, response객체에 정보를 담아 보내준다."
 *       tags: [mypage]
 *       parameters:
 *         - in: query
 *           name: U_EMAIL
 *           schema:
 *             type: Object
 *           description: 쿠키에 담겨진 유저정보를 해독하여 U_EMAIL을 받는다.
 *           example:
 *               U_EMAIL: "asd1@naver.com"
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
 *                            U_EMAIL: {type: string}
 *                            U_NAME: {type: string}
 *                            U_GENDER: {type: string}
 *                            U_BIRTH: {type: Date}
 *                            U_IMAGE: {type: string}                           
 *                       example:
 *                         [
 *                           { "U_EMAIL": "asd@naver.com", "U_NAME":"레너드", "U_GENDER":"남자", "U_BIRTH":1999-12-12 , "U_IMAGE":"son.png"},
 
 *                         ]
 */
router.get("/user/information", authCheck, myPageCtrl.getUser);
// 마이페이지에 유저 정보를 가져온다.
module.exports = router;
