const searchPageCtrl = require("../controllers/searchPageCtrl");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: search
 *   description: 동아리 검색
 */
///////////

/**
 * @swagger
 * paths:
 *  /api/search/selectSearchClub:
 *    get:
 *      summary: "동아리 제목 검색"
 *      description: "Get 방식으로 header에 검색 정보를 받음"
 *      tags: [search]
 *      responses:
 *        "200":
 *          description: 검새된 동아리 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "C_IDX": 1,"U_IDX":1 ,"C_CATEGORY":"스포츠","C_CATE_DETAIL":"축구" ,"C_INTRO":"부산에서 축구 같이 하실 분 들어오세요" , "C_AREA":"부산 북구","C_IMAGE":"son.png","C_TEXT":"동아리 소개 및 일정을 업데이트해주세요!!" },
 *                          ]
 */
router.get("/user/club/search-word", searchPageCtrl.selectSearchClub);
//->검색어 에따른 동아리를 찾는다.
router.get("/user/Category/club", searchPageCtrl.selcectCategoryClub);
// -> 사이드바 클릭시 카테고리별 클럽을 보여준다.
module.exports = router;
