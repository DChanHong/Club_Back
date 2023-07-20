const fs = require("fs");

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

//굳이 파싱을 통해서 conf에 담아서 하는 이유는 보안을 위해서이다.
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

// mysql과 연동이 완료
connection.connect((error) => {
  if (error) {
    console.log("MYSQL CONNECTERROR" + error.stack);
    return;
  }
  console.log("MYSQL CONNECT COMPLETE");
});

//이 connection 어디서든 쓸수 있게 export
module.exports = connection;
