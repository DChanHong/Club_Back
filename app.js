const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { swaggerUi, specs } = require("./swagger/swagger");
const router = express.Router();
const axios = require("axios");
const connection = require("./dbConfig.js");
const request = require("request-promise");
const jwt = require("jsonwebtoken");
// const request = require("request");

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

// socket 이용을 위한 추가 코드들
const http = require("http");
const socketIO = require("socket.io");
const { error } = require("console");

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

/* 다시 naver Oauth 구현 */
app.get("/naver/callback/oauth", async (req, res) => {
  // console.log(req.query.code); // 1. 일단 authorization code 받기 완료
  const code = req.query.code;
  const state = req.query.state;
  const client_id = process.env.NAVER_CLIENT_ID;
  const client_secret = process.env.NAVER_CLIENT_SECRET;
  const redirectURI = process.env.NAVER_REDIRECT_URL;
  const naver_api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&response_type=code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;
  // console.log(naver_api_url);
  const options = {
    url: naver_api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
    json: true,
  };

  const result = await request.get(options);
  const token = result.access_token;
  // console.log(token);

  const info_options = {
    url: "https://openapi.naver.com/v1/nid/me",
    headers: { Authorization: "Bearer " + token },
  };
  const info_result = await request.get(info_options);
  const info_result_json = JSON.parse(info_result).response;
  // console.log(info_result_json);
  /* 
  받아온 데이터
     {
    id: 'TE51DTGHtbMU80LTYOrKsXIRMKkFd_acfwR6KiEUfR4',
    nickname: '홍씨익',
    profile_image: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
    gender: 'M',
    email: 'bkn367@naver.com',
    mobile: '010-5897-3405',
    mobile_e164: '+821058973405',
    name: '성찬홍',
    birthday: '01-17',
    birthyear: '1998'
  }
   */
  const checkUserQuery = async (SQLdata) => {
    return new Promise((resolve, reject) => {
      connection.query(confirmIDSQL, SQLdata, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };

  // 받아온 유저데이터로 MYSQL에 유저 확인
  const SQLdata = [info_result_json.email];
  const confirmIDSQL = "SELECT U_IDX,U_EMAIL FROM USER_TABLE WHERE U_EMAIL=? ";
  let count = 0;
  let userData = "";
  try {
    const result = await checkUserQuery(SQLdata);
    count = result.length;
    userData = result;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
    return;
  }
  // connection.query(confirmIDSQL, SQLdata, (error, result) => {
  //   count = result.length;
  // }); //count가 0이면 회원 가입 후 토큰  , count가 1이면 이미 로그인한 인원으로 토큰 을 보내준다.
  // console.log(count);
  if (count === 0) {
    // 네이버 로그인으로 패스워드는 임의로 고정값을 넣어준다.
    const birth = info_result_json.birthyear + "-" + info_result_json.birthday;
    const insertData = [
      info_result_json.email,
      "naverpass",
      info_result_json.name,
      info_result_json.gender,
      birth,
    ];
    // console.log(insertData);
    const insertSQL =
      "INSERT INTO USER_TABLE(U_EMAIL,U_PASSWORD,U_NAME,U_GENDER,U_BIRTH) VALUES(?,?,?,?,?)";
    connection.query(insertSQL, insertData, (error, rows) => {
      const email = info_result_json.email;
      const booleanLogin = "true";
      const message = "로그인 완료";
      console.log(rows.insertId);
      const result = [{ U_IDX: rows.insertId, U_EMAIL: email }];
      const accessToken = jwt.sign(
        {
          email: email,
          result,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30m",
          issuer: "hong",
        }
      );
      res.cookie("accessToken", accessToken, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      res.redirect(
        `http://localhost:3000/Login/?login=${booleanLogin}&message=${message}`
      );
    });
    //회원정보 저장 이후 토큰에 담아서 보내주자.
  } else {
    console.log("이미 회원임이다");
    const result = userData;
    const booleanLogin = "true";
    const message = "로그인 완료";
    // 이미 회원이므로 토큰에 담아서 보내주자.
    const email = info_result_json.email;
    const accessToken = jwt.sign(
      {
        email: email,
        result,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m",
        issuer: "hong",
      }
    );
    res.cookie("accessToken", accessToken, {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.redirect(
      `http://localhost:3000/Login/?login=${booleanLogin}&message=${message}`
    );
  }
});

/* 다시 naver Oauth 구현 */

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
