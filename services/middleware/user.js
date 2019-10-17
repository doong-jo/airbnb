import status from "http-status";
import { user } from "../../models/db";

export async function checkExists(req, res, next) {
    const { userId } = req.query;

    const result = await user.findOne({
        where: { login_id: userId }
    });

    if (!result) {
        res.status(status.FORBIDDEN);
        return next();
    }
    res.status(status.OK);
    return next();
}

export async function signup(req, res, next) {
    const newUser = req.body;

    try {
        await user.create(newUser);
    } catch (err) {
        res.status(status.FORBIDDEN);
        return next();
    }

    res.status(status.OK);
    return next();
}
