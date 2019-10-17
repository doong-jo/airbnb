import status from "http-status";
import { house } from "../../models/db";
import Sequelize from "sequelize";

const { gte, lte } = Sequelize.Op;
const maxHouseLimit = 10;
const exclude = ["id", "created_at", "updated_at"];

function handleError(err, res, next) {
    console.error(err);
    res.status(status.INTERNAL_SERVER_ERROR);
    return next();
}

export async function findByPeople(req, res, next) {
    const { adult, child, baby } = req.query;
    const people = Math.ceil(adult + child + baby);

    let row;
    try {
        row = await house.findAll({
            attributes: { exclude },
            where: { capacity: { [gte]: people } },
            limit: maxHouseLimit
        });
    } catch (err) {
        return handleError(err, res, next);
    }

    return res.json(row);
}

export async function findByType(req, res, next) {
    const { type } = req.query;

    let row;
    try {
        row = await house.findAll({
            attributes: { exclude },
            where: { type },
            limit: maxHouseLimit
        });
    } catch (err) {
        return handleError(err, res, next);
    }

    return res.json(row);
}

export async function findByPriceRange(req, res, next) {
    const { minPrice, maxPrice } = req.query;

    let row;
    try {
        row = await house.findAll({
            attributes: { exclude },
            where: {
                price: {
                    [gte]: minPrice,
                    [lte]: maxPrice
                }
            },
            limit: maxHouseLimit
        });
    } catch (err) {
        return handleError(err, res, next);
    }

    return res.json(row);
}

export async function findByRoomAndBed(req, res, next) {
    const { minBed, minBedRoom, minBathRoom } = req.query;

    let row;
    try {
        row = await house.findAll({
            attributes: { exclude },
            where: {
                bed: { [gte]: minBed },
                bedroom: { [gte]: minBedRoom },
                bathroom: { [gte]: minBathRoom }
            },
            limit: maxHouseLimit
        });
    } catch (err) {
        return handleError(err, res, next);
    }

    return res.json(row);
}
