const express = require("express");
const router = express.Router({mergeParams: true});
const { getUsers, 
        findUser, 
        followUser, 
        unfollowUser, 
        newMessageNotification, 
        deleteMessageNotification, 
        getFollowers, 
        checkNotification,
        forgotPassword
    } = require("../helpers/user");

router.get("/", getUsers);
router.get("/:id/followers", getFollowers);
router.get("/:username", findUser);
router.get("/:username/notification", checkNotification);
router.post("/forgot", forgotPassword);
router.put("/:username/follow/:id", followUser);
router.put("/:username/unfollow/:id", unfollowUser);
router.put("/:username/:from", newMessageNotification);
router.put("/:username/", deleteMessageNotification);

module.exports = router;