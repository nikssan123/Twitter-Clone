require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const errorHandler = require("./helpers/error");

const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");

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
        
        console.log("registed");
        
    });

    socket.on("private-message", ({user, to, message}) => {
        
        console.log("in private");
        if(connectedUsers[to]){
            console.log(connectedUsers[to]);
            // io.to(connectedUsers[to]).emit("private-message", {message, user});
            io.to(connectedUsers[to]).emit("private-message", {message, user});
            
        }
         
     });
    
}); 

//router
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", loginRequired, ensureCorrectUser, messagesRoutes);
app.use("/api/users/:username", userRoutes);

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