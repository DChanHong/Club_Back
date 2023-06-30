const clubDetailCtrl = require("../controllers/clubDetailCtrl");
const router = require("express").Router();
const authCheck = require("../middleware/authCheck");

router.get("/user/entrance/list", clubDetailCtrl.getClubDetailUserList);
// -> 클럽에 참여한 유저 리스트를 들고온다. SELECT / getClubDetailUserList
//  /user/entrance/list

router.get("/information/title/image/etc", clubDetailCtrl.getClubDetailInfo);
// -> 클럽의 정보(이지미,제목,소개 등)을 들고온다. SELECT / getClubDetailInfo
//  /information/title/image/etc

router.get("/information/notice", clubDetailCtrl.getClubText);
// -> 클럽의 공지사항을 들고온다. SELECT / getClubText
//  /information/notice

router.get("/user/join-check", authCheck, clubDetailCtrl.clubJoinUserCheck);
// -> 이 클랍에 가입한 사람인지 체크해준다. SELECT / clubJoinUserCheck
// /user/join-check

router.post("/user/join-club", authCheck, clubDetailCtrl.JoinClub);
// -> 클럽에 가입한다. + 참여리스트에 추가해준다. INSERT /JoinClub
// /user/join-club

router.delete("/delete/leave-club", authCheck, clubDetailCtrl.LeaveClub);
// -> 클럽 탈퇴한다. DELETE / LeaveClub
// -> /leave-club

router.post("/i-schedule", authCheck, clubDetailCtrl.makeClubSchedule);
// -> 동아리 일정을 만든다. INSERT / makeClubSchedule
// /i-schedule

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
module.exports = router;
