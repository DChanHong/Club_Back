const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { swaggerUi, specs } = require("./swagger/swagger");
const router = express.Router();

const session = require("express-session");
const connection = require("./dbConfig.js");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://club-front.vercel.app"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
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
/* Passport를 이용한 Google Oauth 로그인 */

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback", // 로그인 완료 후에 클라이언트 화면 라우팅 주소
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log("Google Strategy:", profile);

      const email = profile.emails[0].value;
      const IDcheckSQL = "SELECT U_EMAIL FROM USER_TABLE WHERE U_EMAIL=?";
      const SQLData = [email];
      console.log(email);

      connection.query(IDcheckSQL, SQLData, (error, result) => {
        if (error) throw error;
        else {
          if (result.length === 0) {
            console.log("회원 아님");
          } else {
            console.log("회원임");
          }
        }
      });

      return cb(null, profile);
    }
  )
);
app.use(passport.initialize());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",

  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("Server routing after authentication: ", req.user);
    res.redirect(
      "http://localhost:3000/success?user=" + JSON.stringify(req.user)
    );
  }
);

/*  Passport를 이용한 Google Oauth 로그인 */
// socket 이용을 위한 추가 코드들
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);

// 서버에서 클라이언트와 WebSocket 연결을 수락

const io = socketIO(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: [
      "https://club-front-web.vercel.app",
      "https://club-front.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  },
});

//io.on() 메소드로 클라이언트와 연결된 소켓 객체를 받아온다.
io.on("connection", (socket) => {
  console.log("Client User Connected");
  //이벤트 리스너 등록 (채팅 기능 )
  socket.on("chatting", (message) => {
    // console.log(message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`listening socket on ${PORT}`);
});

///----------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Hello World!  testetst???/");
});

app.get("/test", (req, res) => {
  res.send("Hello World!  test 완료");
});

app.get("/api/test", (req, res) => {
  res.send("Hello World!  testetst???/");
});

///----------------------------------------------------------

/* 클럽 임장한 화면 정리 */
app.use("/api/club", require("./routes/clubDetailRouter"));
// club
app.use("/api/club/user/entrance/list", require("./routes/clubDetailRouter"));
app.use(
  "/api/club/information/title/image/etc",
  require("./routes/clubDetailRouter")
);
app.use("/api/club/information/notice", require("./routes/clubDetailRouter"));

app.use("/api/club/user/join-check", require("./routes/clubDetailRouter"));

app.use("/api/club/user/join-club", require("./routes/clubDetailRouter"));

app.use("/api/club/delete/leave-club", require("./routes/clubDetailRouter"));

app.use("/api/club/i-schedule", require("./routes/clubDetailRouter"));

app.use("/api/club/schedule/information", require("./routes/clubDetailRouter"));

app.use(
  "/api/club/schedule/information/context",
  require("./routes/clubDetailRouter")
);

app.use("/api/club/i-shchedule/context", require("./routes/clubDetailRouter"));

app.use("/api/club/host/information", require("./routes/clubDetailRouter"));

app.use("/api/club/u-idx", require("./routes/clubDetailRouter"));

app.use("/api/club/delete/schedule", require("./routes/clubDetailRouter"));

app.use("/api/club/my-name", require("./routes/clubDetailRouter"));

app.use(
  "/api/club/delete/schedule/context",
  require("./routes/clubDetailRouter")
);

app.use("/api/club/notice/text", require("./routes/clubDetailRouter"));

app.use("/api/club/host/check-info", require("./routes/clubDetailRouter"));

app.use("api/club/notice/host/text", require("./routes/clubDetailRouter"));

app.use("/api/club/test/club", require("./routes/clubDetailRouter"));

/* 클럽 임장한 화면 정리 */
//-------------------------------------------------

/* 서치페이지 정리 */
//서치 화면
app.use("/api/search-page", require("./routes/searchPageRouter"));

app.use(
  "/api/search-page/user/club/search-word/",
  require("./routes/searchPageRouter")
); //-> 검색어 서치

app.use(
  "/api/search-page/user/Category/club",
  require("./routes/searchPageRouter")
); // -> 카테고리 서치

app.use(
  "/api/search-page/get/user/category/page/club",
  require("./routes/searchPageRouter")
);

app.use(
  "/api/search-page/get/user/category/page/total-club",
  require("./routes/searchPageRouter")
);

app.use(
  "/api/search-page/get/user/category/page/skeleton",
  require("./routes/searchPageRouter")
);

/* 서치페이지 정리 */

/*  마이페이지 */
app.use("/api/mypage", require("./routes/myPageRouter"));

app.use("/api/mypage/user/withdrawal", require("./routes/myPageRouter"));

app.use("/api/mypage/user/information", require("./routes/customerRouter"));
app.use(
  "api/mypage/participation/club/list",
  require("./routes/customerRouter")
);
app.use("/api/mypage/host/club/list", require("./routes/customerRouter"));

/*  마이페이지 */

/* 로그인 및 회원가입 */
app.use("/api/customer", require("./routes/customerRouter"));

app.use(
  "/api/customer/user/data/injection",
  require("./routes/customerRouter")
);

app.use("/api/customer/check-id", require("./routes/customerRouter"));

app.use("/api/customer/login", require("./routes/customerRouter"));

app.use("/api/customer/logout", require("./routes/customerRouter"));

/* 이미지 업로드 */

//프로플 변경
app.use("/api/image", express.static("image"));

app.use("/api/customer/upload", require("./routes/customerRouter"));

app.use(
  "/api/club/background/image/upload",
  require("./routes/clubDetailRouter")
);
//동아리 백라운드 변경
/* 이미지 업로드 */

/* 로그인 및 회원가입 */

/* 홈 화면 */

app.use("/api/home", require("./routes/homeAddRouter")); // 이게 homeAddRouter 경로 설정을 해둔거임

app.use("/api/home/club/top/list", require("./routes/homeAddRouter"));

app.use(
  "/api/home/club/category/limit/list",
  require("./routes/homeAddRouter")
);

app.use("/api/home/club/modal/information", require("./routes/homeAddRouter"));

app.use("/api/home/new-club", require("./routes/homeAddRouter"));

// app.use("/api/home/getAllCateClub", require("./routes/homeAddRouter"));

/* 홈 화면 */
app.get("/hello", (req, res) => {
  res.send("world");
});

module.exports = app;
