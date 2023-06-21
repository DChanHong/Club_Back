const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { swaggerUi, specs } = require("./swagger/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "https://club-front.vercel.app/",
    // origin: "*",
    credentials: true,
  })
);
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //쿠키을 사용할 것이기에 사용

app.get("/", (req, res) => {
  res.send("Hello World!  testetst???/");
});

app.get("/test", (req, res) => {
  res.send("Hello World!  test 완료");
});

app.get("/api/test", (req, res) => {
  res.send("Hello World!  testetst???/");
});

// router에 있는 customerRouter에서 customer DB를 잘 보내줄 예정이다.
app.use("/api/customer", require("./routes/customerRouter"));

app.use("/api/customer/checkID", require("./routes/customerRouter"));

app.use("/api/customer/login", require("./routes/customerRouter"));
// app.use("/api/customer/logout", require("./routes/customerRouter"));

// 마이페이지

app.use("/api/mypage", require("./routes/myPageRouter"));

app.use("/api/mypage/withdrawalUser", require("./routes/myPageRouter"));

/* 고쳐야 될 것 */
app.use("/api/customer/getuserInfo", require("./routes/customerRouter"));
app.use(
  "api/customer/get/getMyAttClubList",
  require("./routes/customerRouter")
);
app.use("/api/customer/getMyHostClubList", require("./routes/customerRouter"));

//이미지 업로드
app.use("/api/image", express.static("image"));

app.use("/api/customer/upload", require("./routes/customerRouter"));

//홈 화면
app.use("/api/homeAdd", require("./routes/homeAddRouter")); // 이게 homeAddRouter 경로 설정을 해둔거임

app.use("/api/homeAdd/getTopClubList", require("./routes/customerRouter"));

app.use("/api/homeAdd/getCateClubList", require("./routes/customerRouter"));

app.use("/api/homeAdd/getSliderModalInfo", require("./routes/customerRouter"));

app.use("/api/homeAdd/insertNewClubInfo", require("./routes/customerRouter"));

app.use("/api/homeAdd/getAllCateClub", require("./routes/customerRouter"));

//서치 화면
app.use("/api/search", require("./routes/searchPageRouter"));

app.use("/api/search/selectSearchClub", require("./routes/searchPageRouter"));

//카테고리 서치
app.use(
  "/api/search/selcectCategoryClub",
  require("./routes/searchPageRouter")
);

// 동아리 입장하기 화면
app.use("/api/clubDetail", require("./routes/clubDetailRouter"));

app.use(
  "/api/clubDetail/getClubDetailUserList",
  require("./routes/clubDetailRouter")
);
app.use(
  "/api/clubDetail/getClubDetailInfo",
  require("./routes/clubDetailRouter")
);
app.use("/api/clubDetail/getClubText", require("./routes/clubDetailRouter"));

app.use(
  "/api/clubDetail/clubJoinUserCheck",
  require("./routes/clubDetailRouter")
);

app.use("/api/clubDetail/JoinClub", require("./routes/clubDetailRouter"));

app.use("/api/clubDetail/LeaveClub", require("./routes/clubDetailRouter"));

app.use(
  "/api/clubDetail/makeClubSchedule",
  require("./routes/clubDetailRouter")
);

app.use(
  "/api/clubDetail/callClubSchedule",
  require("./routes/clubDetailRouter")
);

app.use("/api/clubDetail/getContext", require("./routes/clubDetailRouter"));

app.use("/api/clubDetail/insertContext", require("./routes/clubDetailRouter"));

app.use("/api/clubDetail/getHostInfo", require("./routes/clubDetailRouter"));

app.use("/api/clubDetail/getMyIdx", require("./routes/clubDetailRouter"));

app.use("/api/clubDetail/deletSchedule", require("./routes/clubDetailRouter"));

app.use("/api/clubDetail/getUserName", require("./routes/clubDetailRouter"));

app.use("/api/clubDetail/deleteContext", require("./routes/clubDetailRouter"));

app.use("/api/clubDetail/selectNotice", require("./routes/clubDetailRouter"));

app.use("/api/clubDetail/selectHost", require("./routes/clubDetailRouter"));

app.use("api/clubDetail/updateNotice", require("./routes/clubDetailRouter"));

app.listen(PORT, () => {
  console.log(`server is start on ${PORT}`);
});

app.get("/hello", (req, res) => {
  res.send("world");
});

module.exports = app;
