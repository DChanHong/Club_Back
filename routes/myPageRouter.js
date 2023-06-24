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
 *    get:
 *      summary: "검색어에 따른 동아리를 찾는다."
 *      description: "Get 방식으로 header에 검색 정보를 받음"
 *      tags: [search]
 *      parameters:
 *        - in: query
 *          name: ClubName Search word
 *          schema:
 *          type: String
 *          description: 클럽 검색위한 검색어
 *          example:
 *             {C_NAME: "검색어" }
 *
 *      responses:
 *        "200":
 *          description: 검새된 동아리 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                          [
 *                            { "C_IDX": 1,"U_IDX":1 ,"C_CATEGORY":"스포츠","C_CATE_DETAIL":"축구" ,"C_INTRO":"부산에서 축구 같이 하실 분 들어오세요" , "C_AREA":"부산 북구","C_IMAGE":"son.png","C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" },
 *                          ]
 */
router.put("/user/withdrawal", authCheck, myPageCtrl.withdrawalUser);
// 유저가 회원 탈퇴하다.
router.get("/participation/club/list", authCheck, myPageCtrl.getMyAttClubList);
// 내가 참여중인 동아리리스트를 불러온다.
router.get("/host/club/list", authCheck, myPageCtrl.getMyHostClubList);
// 내가 호스트인 동아리 리스트

router.get("/user/information", authCheck, myPageCtrl.getUser);
// 마이페이지에 유저 정보를 가져온다.
module.exports = router;
