const authCheck = require("../middleware/authCheck");
const myPageCtrl = require("../controllers/myPageCtrl");
const router = require("express").Router();

router.get("/withdrawalUser", authCheck, myPageCtrl.withdrawalUser);

module.exports = router;
