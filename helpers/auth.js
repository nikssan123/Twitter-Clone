const db = require("../models/index");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next){
    try{
        let user = await db.User.findOne({
            email: req.body.email
        });
    
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        
        // console.log(id, username, following);

        if(isMatch){
            let token = jwt.sign({ 
                id,
                username,
                profileImageUrl,
                // following
            }, process.env.SECRET_KEY);
    
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                // following,
                token
            })
        }else{
            return next({
                status: 400,
                message: "Invalid Email/Password"
            });
        }
    }catch(err){
        return next({
            status: 400,
            message: "Invalid Email/Password"
        });
    }
    
}

exports.signup = async function (req, res, next){
    try {
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (error) {
        //mongoose validation code fail 
        if(error.code === 11000){
            error.message = "Sorry, that username and/or email is taken";
        }

        return next({
            status: 400,
            message: error.message
        })
    }
}

module.exports = exports;