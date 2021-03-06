const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordResetToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    profileImageUrl: {
        type: String
    },
    profilePicPublicId: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    chatMessages: {
        from: {
            type: String
        },
    },
    
});

userSchema.pre("save", async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        }

        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }catch(err){
        return next(err); 
    }
});


userSchema.methods.comparePassword = async function(password, next){
    try {
        let isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        return next(error);
    }
}

const User = mongoose.model("User", userSchema);


module.exports = User;