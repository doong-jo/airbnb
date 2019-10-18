import status from "http-status";
import {
    findByPeople,
    findByType,
    findByPriceRange,
    findByRoomAndBed
} from "../../repo/house-finder";

function handleError(err, next) {
    console.error(err);
    next(err);
}

export async function conveyByPeople(req, res, next) {
    const { adult, child, baby } = req.query;
    const people = Math.ceil(adult + child + baby);

    let row;
    try {
        row = await findByPeople(people);
    } catch (err) {
        return handleError(err, next);
    }

    return res.json(row);
}

export async function conveyByType(req, res, next) {
    const { type } = req.query;

    let row;
    try {
        row = await findByType(type);
    } catch (err) {
        return handleError(err, next);
    }

    return res.json(row);
}

export async function conveyByPriceRange(req, res, next) {
    const { minPrice, maxPrice } = req.query;

    let row;
    try {
        row = await findByPriceRange(minPrice, maxPrice);
    } catch (err) {
        return handleError(err, next);
    }

    return res.json(row);
}

export async function conveyByRoomAndBed(req, res, next) {
    const { minBed, minBedRoom, minBathRoom } = req.query;

    let row;
    try {
        row = await findByRoomAndBed(minBed, minBedRoom, minBathRoom);
    } catch (err) {
        return handleError(err, next);
    }

    return res.json(row);
}
