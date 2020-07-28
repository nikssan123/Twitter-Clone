const db = require("../models");

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
        const user = await db.User.find({username: username}).populate("messages followers"); 
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