import express from "express";
import authRouter from "./auth";
import houseRouter from "./house";

const router = express.Router();
const routes = {
    "/auth": authRouter,
    "/house": houseRouter
};

for (const [path, route] of Object.entries(routes)) {
    router.use(path, route);
}

export default router;
