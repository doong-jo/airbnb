const userRepo = require("../../repo/user");
const httpStatus = require("http-status");

async function getUsers(req, res, next) {
    const response = userModel.findAllUser();
    if (!response) {
        res.statusCode = httpStatus.FORBIDDEN;
        return next();
    }

    res.json(response);
}

async function signup(req, res, next) {
    if (res.exists) {
        res.statusCode = httpStatus.FORBIDDEN;
        return next();
    }

    const response = await userRepo.signup(req.body);
    if (!response) {
        res.statusCode = httpStatus.FORBIDDEN;
        return next();
    }

    res.json(response);
}

async function checkExists(req, res, next) {
    const getId = {
        GET: req.query,
        POST: req.body
    };
    const { id } = getId[req.method];
    const exists = !!(await userRepo.findById(id));

    if (typeof exists === "undefined") {
        res.statusCode = 403;
        return next();
    }

    if (req.route.path === "/exists") {
        res.json(exists);
        return;
    }
    res.exists = exists;
    next();
}

module.exports = {
    getUsers,
    signup,
    checkExists
};
