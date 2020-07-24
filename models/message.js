const mongoose = require("mongoose");
const User = require("./user");


const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }, 
}, 
{
    timestamps: true
});

//remove the message and remove the message id from the user model
messageSchema.pre("remove", async function(next){
    try{
        let user = await User.findById(this.user);

        user.messages.remove(this.id);

        await user.save();

        return next();
    }catch(err){
        return next(err);
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;