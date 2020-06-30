const express = require("express");
const router = express.Router();
const { signup, singin, signin } = require("../helpers/auth");

router.post("/signup", signup);
router.post("/signin", signin);


module.exports = router;