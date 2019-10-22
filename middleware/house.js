import status from "http-status";
import houseFinder from "../repo/house-finder";

function handleError(err, next) {
    console.error(err);
    next(err);
}

export async function findHouse(req, res, next) {
    const { query } = req;

    let row;
    try {
        row = await houseFinder.find(query);
    } catch (err) {
        return handleError(err, next);
    }

    return res.status(status.OK).json(row);
}
