import status from "http-status";
import { user } from "../../models/db";

export async function checkExists(req, res, next) {
    const { userId } = req.query;

    let result;
    try {
        result = await user.findOne({
            where: { login_id: userId }
        });
    } catch (err) {
        return next(err);
    }

    if (!result) {
        res.status(status.FORBIDDEN).end();
    }

    res.status(status.OK);
    next();
}

export async function signup(req, res, next) {
    const newUser = req.body;

    try {
        await user.create(newUser);
    } catch (err) {
        return res.status(status.FORBIDDEN).end();
    }

    res.status(status.OK);
    next();
}
