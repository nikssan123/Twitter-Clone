const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    // users: [String],
    room: String,
    roomReversed: String,
    messages: [{
        from: String,
        profilePic: String,
        message: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]

},
{
    timestamps: true
}
);

chatSchema.pre("save", function(next){
    if(this.isNew){
        this.messages.push(1);
    }

    next();
})

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;