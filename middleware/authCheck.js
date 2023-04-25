const jwt = require("jsonwebtoken");

// const expressJwt = require('express-jwt');

const dotenv =require('dotenv');
dotenv.config();



const authCheck = (req , res  , next)=>{
    // console.log(req.headers['authorization'])
    // console.log(req.headers.cookie.split('accessToken=')[1])
    if(req.headers.cookie){
        const token =req.headers.cookie.split('accessToken=')[1];
        // console.log('저장 토큰 :' , token)
        
         jwt.verify(token,process.env.JWT_SECRET_KEY ,(err)=>{
            if(err){
                
                res.status(401).json({error:" Auth Error from authChecker"})
            }
            else{
                next();
            }
        });
    }else{
        
        res.status(401).json({error:"Auth Error from authChecker"});
    }
};

module.exports =authCheck