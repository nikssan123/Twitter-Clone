const express = require("express");
const router = express.Router({mergeParams: true});
const { findUser, followUser, unfollowUser, newMessageNotification } = require("../helpers/user");

router.get("/", findUser);
router.put("/follow/:id", followUser);
router.put("/unfollow/:id", unfollowUser);
router.put("/:from", newMessageNotification);

module.exports = router;