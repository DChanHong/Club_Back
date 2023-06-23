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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //쿠키을 사용할 것이기에 사용

const PORT = 4000;
// 몽고 디비
const chatRouter = require("./mongoRouters/chatRouter");
app.use("/api/chat", chatRouter); //이걸로 chatRouter 경로는 설정 끝
// 여기서 /chat 등록하고 -> 이러면 /chat/user/chat 이렇게 등록된건가?

//

// socket 이용을 위한 추가 코드들
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);

// 서버에서 클라이언트와 WebSocket 연결을 수락
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
//emit
io.on("send-message", (message) => {
  console.log(message);
  io.emit("message", message);
});

//io.on() 메소드로 클라이언트와 연결된 소켓 객체를 받아온다.
io.on("connection", (socket) => {
  console.log("Client User Connected");
  //이벤트 리스너 등록 (채팅 기능 )
  socket.on("chatting", (message) => {
    // console.log(message);
    io.emit("chatting", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`listening socket on ${PORT}`);
});

//////////////////

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

// app.listen(PORT, () => {
//   console.log(`server is start on ${PORT}`);
// });

app.get("/hello", (req, res) => {
  res.send("world");
});

module.exports = app;
