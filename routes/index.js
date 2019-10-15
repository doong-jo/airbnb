const httpStatus = require("http-status");
const router = require("express").Router();

const authRouter = require("./auth");
const userRouter = require("./user");
const carouselRouter = require("./carousel");
const adminRouter = require("./admin");

const mainRouter = passport => {
    const routes = {
        "/auth": authRouter(passport),
        "/user": userRouter,
        "/carousel": carouselRouter,
        "/admin": adminRouter
    };

    for (const [path, route] of Object.entries(routes)) {
        router.use(path, route);
    }

    router.use((req, res, next) => {
        res.statusCode = httpStatus.NOT_FOUND;
        next();
    });

    return router;
};

module.exports = mainRouter;
