const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/warbler", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
}, () => {
    console.log("Connected to the DB");
});

module.exports.User = require("./user");
module.exports.Message = require("./message");