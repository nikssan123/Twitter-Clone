const db = require("../models/index");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

exports.signin = async function (req, res, next){
    try{
        let user = await db.User.findOne({
            email: req.body.email
        });
    
        let { id, username, profileImageUrl, email } = user;
        let isMatch = await user.comparePassword(req.body.password);
        
        // console.log(id, username, following);

        if(isMatch){
            let token = jwt.sign({ 
                id,
                username,
                profileImageUrl,
                email
                // following
            }, process.env.SECRET_KEY);
    
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                email,
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
        let { id, username, profileImageUrl, email } = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl,
            email
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            email,
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

exports.editUser = async (req, res, next) => {

    const { email, username, file } = req.body;
    try {
        const user = await db.User.findById(req.params.id);
        if(email){
            user.email = email;
        }

        if(username){
            user.username = username;
        }

        if(file){
            // console.log(file);
            if(user.profilePicPublicId){
                await cloudinary.uploader.destroy(user.profilePicPublicId);
            }
           
            const uploadResponse = await cloudinary.uploader.upload(file);
            user.profileImageUrl = uploadResponse.secure_url;
            user.profilePicPublicId = uploadResponse.public_id;
        }

        user.save().then(user => {
            let { id, username, profileImageUrl, email } = user;
            let token = jwt.sign({
                id,
                username,
                profileImageUrl,
                email
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                email,
                token
            });
        }).catch(err => {
            return next(err);
        });

        

    } catch (error) {
        return next(error);
    }
}

exports.passwordReset = async (req, res, next) => {
    try {
        const user =  await db.User.findOne({ passwordResetToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}});
        if(user){
            if(req.body.password){
                if(req.body.password === req.body.password2){
                    user.passwordResetToken = undefined;
                    user.resetPasswordExpires = undefined;
    
                    
                    user.password = req.body.password;
    
                    user.save();
    
                    /*
                    
                            .then(user => {
                        let { id, username, profileImageUrl, email } = user;
                        let token = jwt.sign({
                            id,
                            username,
                            profileImageUrl,
                            email
                        }, process.env.SECRET_KEY);
    
                        return res.status(200).json({
                            id,
                            username,
                            profileImageUrl,
                            email,
                            token
                        });
                    }).catch(err => {
                        return next(err);
                    });
                    */
    
                    res.json({message: "You successfully changed your password!"});
                }else{
                    return next(new Error("Passwords do not match!"));
                }
            }else{
                return next(new Error("You must provide a password"));
            }
           
            // res.json(user);
        }else{
            return next(new Error("Password reset token is invalid or has expired"));
        }
        
    } catch (error) {
        return next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await db.User.findOneAndDelete({_id: req.params.id});

        if(deletedUser.profilePicPublicId){
            cloudinary.uploader.destroy(deletedUser.profilePicPublicId);
        }

        deletedUser.following.forEach((async user => {
            const foundUser = await db.User.findOne({_id: user._id});
            foundUser.followers.pull(deletedUser._id);
            foundUser.save();
        }));

        res.status(200).json(deletedUser);
    } catch (error) {
        return next(error);
    }
}

module.exports = exports;