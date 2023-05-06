const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",

    methods: ["GET", "POST"],
    credentials: true,
  })
);
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //쿠키을 사용할 것이기에 사용

// router에 있는 customerRouter에서 customer DB를 잘 보내줄 예정이다.
app.use("/api/customer", require("./routes/customerRouter"));

app.use("/api/customer/checkID", require("./routes/customerRouter"));

app.use("/api/customer/login", require("./routes/customerRouter"));
/////
// app.use("/api/customer/accesstoken", require("./routes/customerRouter"));

app.use("/api/customer/getuserInfo", require("./routes/customerRouter"));

// app.use('/api/customer/login/success',require('./routes/customerRouter'))

app.use("/api/image", express.static("image"));

app.use("/api/customer/upload", require("./routes/customerRouter"));

app.listen(PORT, () => {
  console.log(`server is start on ${PORT}`);
});
