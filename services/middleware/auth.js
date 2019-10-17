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

function handleJwtError(err, res, next) {
    console.error(err);
    res.status(status.INTERNAL_SERVER_ERROR);
    next();
}

function handleUnauthorized(res, next) {
    res.status(status.UNAUTHORIZED);
    next();
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
        return handleJwtError(err, res, next);
    }

    res.userToken = userToken;
    next();
}

export function checkToken(req, res, next) {
    const { userToken } = req.cookies;
    if (!userToken) {
        return handleUnauthorized(res, next);
    }

    let decoded;
    try {
        decoded = jwt.verify(userToken, JWT_SECRET);
    } catch (err) {
        return handleJwtError(err, res, next);
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
        return handleJwtError(err, res, next);
    }

    if (!row) {
        return handleUnauthorized(res, next);
    }

    res.status(status.OK);
    next();
}
