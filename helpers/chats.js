const Chat = require("../models/Chat");

const PER_PAGE = 20;


exports.createChat = async (req, res, next) => {
    const {username, receiver, pageNumber} = req.body;
    const room = `${username}-${receiver}`;
    const roomReversed = `${receiver}-${username}`;
    try {
        
        const chat = await getChat(username, receiver, pageNumber);
        if(chat.length > 0){

            res.json(chat);
        }else{
            const newChat = await Chat.create({
                room,
                roomReversed
            });

            

            res.json(newChat);
        }
        
       
        
    } catch (error) {
        return next(error);
    }
}

exports.getChat = async (req, res, next) => {
    const {username, receiver, pageNumber} = req.body;
    // const room = `${username}-${receiver}`;
    try {
        const chat = await getChat(username, receiver, pageNumber);
        // console.log(chat);
        res.status(200).json(chat);
    } catch (error) {
        return next(error);
    }
}


exports.createMessage = async (req, res, next) => {
    const { id } = req.params;
    const { from, message, profilePic } = req.body;
    try {
        const chat = await Chat.findById(id);

        //check if the user that sends the message is in the correct room
        const users = chat.room.split("-");
        
        if(users.indexOf(from) !== -1){
            const chatMessage = {
                from,
                profilePic,
                message
            }
    
            chat.messages.push(chatMessage);
            chat.save();
    
            res.status(200).json(chat);
        }else{
            res.json({message: "Wrong username"});
        }
        
    } catch (error) {
        return next(error);
    }
}

//
const getChat = async (username, receiver, pageNumber) => {
    const room = `${username}-${receiver}`;
    const slice = (pageNumber * PER_PAGE);
    try {
        const chat = await Chat.find({$or:[{room: room},{roomReversed: room}]}, { messages: { $slice:  [-slice, PER_PAGE] } });
        // return chat.length > 0 ? false : true;
        return chat;
    } catch (error) {
        return error;
    }
}