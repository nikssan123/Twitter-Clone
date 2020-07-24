const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/warbler", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true ,
    useFindAndModify: false
}, () => {
    console.log("Connected to the DB");
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
module.exports.Chat = require("./Chat");