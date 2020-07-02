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

exports.followUser = async (req, res, next) => {
    const username = req.params.username;
    try {
        let user = await db.User.find({username: username}).populate("followers messages");
        // console.log(user[0].followers);
        
        let isFollowing = false;
        user[0].followers.forEach(u => {
            if(u.equals(req.params.id)){
                isFollowing = true;
            }
        });

        if(!isFollowing){
            user[0].followers.push(req.params.id);
            await user[0].save();
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
        let isFollowing = false;
        user[0].followers.forEach(u => {
            if(u.equals(req.params.id)){
                isFollowing = true;
            }
        });
        if(isFollowing){
            user[0].followers.pop(req.params.id);
            await user[0].save();
        }
        res.json(user);
    } catch (error) {
        return next(error);
    }
}