require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const errorHandler = require("./helpers/error");
// const {deleteMessageNotification} = require('./helpers/functions');

const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

const db = require("./models");



const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//set up socket.io for the chat

let connectedUsers = {};

io.on("connection", socket => {
    socket.on("register", info => {
        socket.username = info.username;
        connectedUsers[info.username] = socket.id;
        
    });

    socket.on("private-message", ({user, to, message}) => {
        
        if(connectedUsers[to]){
            io.to(connectedUsers[to]).emit("private-message", {message, user});
        }
    });

    // socket.on("disconnect", () => {
    //     console.log("ds");
    //     const user  = deleteMessageNotification(socket.username);
    //     console.log(user);
    //     //Delete the chatMessages in user model -> create new route or function db.User.findoneAndUpdate({username: username}, from: "")
    // });
    
}); 

//router
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", loginRequired, ensureCorrectUser, messagesRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/chats/", chatRoutes);


app.get("/api/messages", loginRequired, async (req, res, next) => {
    try {
        let messages = await db.Message.find({}).sort({createdAt: "desc"}).populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    } catch (error) {
        return next(error);
    }
})

//404 error
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);


http.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});