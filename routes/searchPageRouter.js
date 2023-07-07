const searchPageCtrl = require("../controllers/searchPageCtrl");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: search
 *   description: 동아리 검색
 */

/**
 * @swagger
 *
 * paths:
 *  /api/search-page/user/club/search-word:
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
 *          description: 검색된 동아리 정보
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
router.get("/user/club/search-word", searchPageCtrl.selectSearchClub);
//->검색어 에따른 동아리를 찾는다.

/**
 * @swagger
 *
 * paths:
 *  /api/search-page/user/Category/club:
 *    get:
 *      summary: "카테고리별 동아리 정보를 가져온다."
 *      description: "Get 방식으로 header에 카테고리별 동아리 정보를 가져온다."
 *      tags: [search]
 *      parameters:
 *        - in: query
 *          name: Category search
 *          schema:
 *          type: String
 *          description: 카테고리 검색
 *          example:
 *             {C_CATEGORY: "스포츠" }
 *
 *      responses:
 *        "200":
 *          description: 카테고리별 동아리
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
router.get("/user/Category/club", searchPageCtrl.selcectCategoryClub);
// -> 사이드바 클릭시 카테고리별 클럽을 보여준다.

router.get("/get/user/category/page/club", searchPageCtrl.selectCategoryPage);

// 전체 동아리 리스트 보기
router.get("/get/user/category/page/total-club", searchPageCtrl.selectAllClub);

router.get("/get/user/category/page/skeleton", searchPageCtrl.testSkeleton);
module.exports = router;
