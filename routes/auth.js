const express = require("express");
const router = express.Router();
const { signup, signin, editUser, passwordReset, deleteUser } = require("../helpers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/:id/settings", editUser);
router.put("/reset/:token", passwordReset);
router.delete("/:id", deleteUser);


module.exports = router;