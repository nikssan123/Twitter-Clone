const db = require("../models");

exports.createMessage = async function(req, res, next){
    try {
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        // console.log(req.)
        let user = await db.User.findById(req.params.id);
        user.messages.push(message.id);
        await user.save();

        let foundMessage = await db.Message.findById(message.id).populate("user", {
            username: true,
            profileImageUrl: true
        });

        return res.status(200).json(foundMessage);
    } catch (error) {
        return next(error);
    }
}

exports.getMessage = async function(req, res, next){
    try {
        let message = await db.Message.findById(req.params.message_id);
        return res.status(200).json(message);

    } catch (error) {
        return next(error);
    }
}

exports.deleteMessage = async function(req, res, next){
    try{
        let foundMessage = await db.Message.findById(req.params.message_id);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    }catch(e){
        return next(e);
    }
}