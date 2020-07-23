const express = require("express");
const router = express.Router();
const { createChat, getChat, createMessage } = require("../helpers/chats");

// router.post("/", createChat);
router.route("/")
    .post(createChat)
    .get(getChat);

router.route("/:id")
    .put(createMessage);

module.exports = router;