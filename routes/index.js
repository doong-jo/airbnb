import httpStatus from "http-status";
import express from "express";
import authRouter from "./auth";
import { checkToken, generateToken } from "../services/middleware/auth";

const router = express.Router();

const routes = {
    "/auth": authRouter
};

router.use(checkToken);

for (const [path, route] of Object.entries(routes)) {
    router.use(path, route);
}

export default router;
