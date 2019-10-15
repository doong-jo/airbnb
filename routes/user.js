const express = require("express");
const userService = require("../services/middleware/user");

const router = express.Router();

router.get("/", userService.getUsers);
router.get("/exists", userService.checkExists);
router.post("/signup", userService.checkExists, userService.signup);

module.exports = router;
