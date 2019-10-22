import jwt from "jsonwebtoken";
import status from "http-status";
import { user } from "../models/db";
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

function handleUnauthorized(res, next) {
    res.status(status.UNAUTHORIZED).end();
    next();
}

function handleError(err, next) {
    console.error(err);
    next(err);
}

export function generateToken(req, res, next) {
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
        return handleError(err, next);
    }

    res.status(status.OK);
    req.userToken = userToken;
    res.cookie("userToken", userToken, {
        expires: new Date(Date.now() + 24 * 3600000) // cookie will be removed after 24 hours
        // httpOnly: true, // http only, prevents JavaScript cookie access
        // secure: true // cookie must be sent over https / ssl
    });
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
        return handleUnauthorized(res, next);
    }

    if (!decoded) {
        return handleUnauthorized(res, next);
    }

    res.status(status.OK);
    next();
}

export async function checkLoginInfo(req, res, next) {
    const { userId, userPwd } = req.body;
    let row;
    try {
        const { and } = Sequelize.Op;
        row = await user.findOne({
            where: { [and]: { login_id: userId, password: userPwd } }
        });
    } catch (err) {
        return handleError(err, next);
    }

    if (!row) {
        console.log("no match logininfo");
        return handleUnauthorized(res, next);
    }

    res.status(status.OK);
    console.log("success logininfo");
    next();
}
