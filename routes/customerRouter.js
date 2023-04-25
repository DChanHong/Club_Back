const customerCtrl =require('../controllers/customerCtrl')
const router = require('express').Router();

// import { authCheck } from '../middleware/authCheck';
const authCheck =require('../middleware/authCheck')

router.get('/' , customerCtrl.getCustomer);
router.post('/' , customerCtrl.insertCustomer)
router.post('/checkID' , customerCtrl.checkID)
router.post('/login' ,customerCtrl.checkLogin )
router.get('/accesstoken',customerCtrl.accessToken)
router.get('/refreshtoken',customerCtrl.refreshToken)

router.get('/getuserInfo',authCheck, customerCtrl.getUser)
module.exports = router;
