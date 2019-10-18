import jwt from "jsonwebtoken";
import status from "http-status";
import { user } from "../../models/db";
import dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config();

const {
    JWT_DEV_EXPIRE,
    JWT_PROD_EXPIRE,
    NODE_ENV,
    ENV_DEV,
    ENV_PROD,
    JWT_SECRET
} = process.env;

function handleJwtError(err, next) {
    console.error(err);
    next(err);
}

function handleUnauthorized(res, next) {
    res.status(status.UNAUTHORIZED).end();
}

export function generateToken(req, res, next) {
    console.log("generateToken In");
    const { userId } = req.body;
    const expiresIn = (() => {
        if (NODE_ENV === ENV_DEV) {
            return JWT_DEV_EXPIRE;
        } else if (NODE_ENV === ENV_PROD) {
            return JWT_PROD_EXPIRE;
        }
    })();

    let userToken;
    try {
        userToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn });
    } catch (err) {
        return handleJwtError(err, next);
    }

    res.status(status.OK);
    res.userToken = userToken;
    next();
}

export function checkToken(req, res, next) {
    if (!req.cookies || !req.cookies.userToken) {
        return handleUnauthorized(res, next);
    }
    const { userToken } = req.cookies;

    let decoded;
    try {
        decoded = jwt.verify(userToken, JWT_SECRET);
    } catch (err) {
        return handleJwtError(err, next);
    }

    if (!decoded) {
        return handleUnauthorized(res, next);
    }

    res.status(status.OK);
    next();
}

export async function checkLoginInfo(req, res, next) {
    console.log("logininfo In");
    const { userId, userPwd } = req.body;

    let row;
    try {
        const { and } = Sequelize.Op;
        row = await user.findOne({
            where: { [and]: { login_id: userId, password: userPwd } }
        });
    } catch (err) {
        return handleJwtError(err, next);
    }

    if (!row) {
        console.log("no match logininfo");
        return handleUnauthorized(res, next);
    }

    res.status(status.OK);
    next();
    console.log("success logininfo");
}
