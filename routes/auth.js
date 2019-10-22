import express from "express";
import { generateToken, checkToken, checkLoginInfo } from "../middleware/auth";

const router = express.Router();

router.post("/passport", checkToken);
router.post("/login", checkLoginInfo, generateToken);

export default router;
