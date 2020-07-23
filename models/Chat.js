const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    // users: [String],
    room: String,
    roomReversed: String,
    messages: [{
        from: String,
        profilePic: String,
        message: String
    }]

});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;