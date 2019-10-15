const express = require("express");
const router = express.Router();

const authRouter = passport => {
    const authService = require("../services/middleware/auth")(passport);

    router.post("/login", authService.authenticate);
    router.post("/logout", authService.clearAuth);
    router.post("/passport", authService.isLogined);

    return router;
};

module.exports = authRouter;
