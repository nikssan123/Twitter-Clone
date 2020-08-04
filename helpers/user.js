const db = require("../models");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
// const xoath = require("xoauth2")

// function checkIsFollowing(user){
//     console.log("in the function");
//     let isFollowing = false;
//     user[0].followers.forEach(u => {
//         console.log(u);
//         if(u.equals(req.params.id)){
//             isFollowing = true;
//         }
//     });
//     return isFollowing;
// }

exports.getUsers = async (req, res, next) => {
    try {
        const users = await db.User.find({}, ["username", "profileImageUrl"]);

        res.json(users);
    } catch (error) {
        return next(error);
    }
}

exports.findUser = async (req, res, next) => {
    const username = req.params.username;
    try {
        const user = await db.User.find({username: username}).populate("messages followers").select("-password").exec(); 
        // const messages = user[0].messages;
        // messages.forEach(m => {
        //     console.log(m);
        // });
        res.json(user);
    } catch (error) {
        return next(error);
    }
}

exports.checkNotification = async (req, res, next) => {
    const username = req.params.username;
    try {
        const user = await db.User.find({username: username}).select("chatMessages");
        // const messages = user[0].messages;
        // messages.forEach(m => {
        //     console.log(m);
        // });
        res.json(user);
    } catch (error) {
        return next(error);
    }
}

exports.getFollowers = async (req, res, next) => {
    try {
        const user = await db.User.findById(req.params.id).populate("following", "username").exec();

        res.json(user.following);
    } catch (error) {
        return next(error);
    }
}

exports.followUser = async (req, res, next) => {
    const username = req.params.username;
    try {
        let user = await db.User.find({username: username}).populate("followers messages");
        let currentUser = await db.User.findById(req.params.id).populate("following");
        // console.log(user[0].followers);
        
        let isFollowing = false;
        user[0].followers.forEach(u => {
            if(u.equals(req.params.id)){
                isFollowing = true;
            }
        });

        if(!isFollowing){
            currentUser.following.push(user[0]._id);
            user[0].followers.push(req.params.id);
            await user[0].save();
            await currentUser.save();
        }
        
        res.json(user);
    } catch (error) {
        return next(error);
    }
}

exports.unfollowUser = async (req, res, next) => {
    const username = req.params.username;
    try {
        let user = await db.User.find({username: username});
        let currentUser = await db.User.findById(req.params.id).populate("following");

        let isFollowing = false;
        user[0].followers.forEach(u => {
            if(u.equals(req.params.id)){
                isFollowing = true;
            }
        });
        if(isFollowing){
            user[0].followers.pop(req.params.id);
            currentUser.following.pop(user[0]._id);
            await user[0].save();
            await currentUser.save();
        }
        res.json(user);
    } catch (error) {
        return next(error);
    }
}

exports.newMessageNotification = async (req, res, next) => {
    const to = req.params.username;
    // const message = req.body.message;
    const from = req.params.from;

    try {
        let user = await db.User.findOneAndUpdate({username: to}, {chatMessages: {from}});
        // user.chatMessages.messages.push(message);
        // await user.save();
        res.json(user);
        
    } catch (error) {
        return next(error);
    }
}

exports.deleteMessageNotification = async (req, res, next) => {
    const username = req.params.username;
    try {
        let user = await db.User.findOneAndUpdate({username}, {chatMessages: {}});
        res.json(user);
    } catch (error) {
        return next(error);
    }
}

exports.forgotPassword = async (req, res, next) => {
    try {

        let token;
        crypto.randomBytes(20, (err, buf) => {
            token = buf.toString("hex");
        });

        const user = await db.User.findOne({email: req.body.email});

        if(user){
            user.passwordResetToken = token;
            user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; //1 hour
            // res.json(user);

            
            user.save().then(user => {
                const transport = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    auth: {
                        type: "OAuth2",
                        user: "fornax.elit@gmail.com",
                        clientId: process.env.GOOGLE_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                        refreshToken: process.env.GOOGLE_REFRESH_TOKEN                              
                    }
                });

                const mailOptions = {
                    to: user.email,
                    from: "fornax.elit@gmail.com",
                    subject: "Warbler Password Reset!",
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };

                transport.sendMail(mailOptions).then(() => {
                    res.json({message: "An e-mail has been sent with further instructions!"});
                }).catch(err => {
                    console.log(err);
                    return next({message: "Something happenned while sending the e-mail! Try again later!"});
                })
            });
        }else{
            next({message: "No user is associated with this email!"});
        }

    } catch (error) {
        return next(error);
    }
}