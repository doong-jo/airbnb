import express from "express";
import {
    generateToken,
    checkToken,
    checkLoginInfo
} from "../services/middleware/auth";
const asyncHandler = require("express-async-handler");

const router = express.Router();

router.post("/passport", checkToken);
router.post("/login", asyncHandler(checkLoginInfo), generateToken);

export default router;
