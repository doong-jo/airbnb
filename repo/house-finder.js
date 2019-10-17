import db from "../models/db";
import Sequelize from "sequelize";

const { gte, lte, between, or, notIn } = Sequelize.Op;
const { house } = db;

const exclude = ["id", "created_at", "updated_at"];
const maxHouseLimit = 10;

function handleError(err) {
    console.error(err.sql);
    throw new Error(err.sql);
}

export async function findAvailableHouse(userCheckIn, userCheckOut) {
    async function findReservedIds(userCheckIn, userCheckOut) {
        const { reservation } = db;
        const attributes = ["house_id"];

        let row = [];
        try {
            row = await reservation.findAll({
                attributes,
                where: {
                    [or]: {
                        check_in: { [between]: [userCheckIn, userCheckOut] },
                        check_out: { [between]: [userCheckIn, userCheckOut] }
                    }
                }
            });
        } catch (err) {
            handleError(err);
        }

        const reservedHouseIds = row.reduce((acc, cur) => {
            acc.push(cur.dataValues.house_id);
            return acc;
        }, []);

        return reservedHouseIds;
    }

    async function fineNotReservedIds(rsrvIds) {
        let houses = [];
        try {
            houses = await house.findAll({
                attributes: { exclude },
                where: {
                    id: { [notIn]: rsrvIds }
                },
                limit: maxHouseLimit
            });
        } catch (err) {
            handleError(err);
        }

        return houses;
    }

    const reservedHouseIds = await findReservedIds(userCheckIn, userCheckOut);
    const availableHouses = await fineNotReservedIds(reservedHouseIds);

    return availableHouses;
}

export async function findByPeople(people) {
    let houses;
    try {
        houses = await house.findAll({
            attributes: { exclude },
            where: { capacity: { [gte]: people } },
            limit: maxHouseLimit
        });
    } catch (err) {
        handleError(err);
    }

    return houses;
}

export async function findByType(type) {
    let houses;
    try {
        houses = await house.findAll({
            attributes: { exclude },
            where: { type },
            limit: maxHouseLimit
        });
    } catch (err) {
        handleError(err);
    }

    return houses;
}

export async function findByPriceRange(minPrice, maxPrice) {
    let houses;
    try {
        houses = await house.findAll({
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
        handleError(err);
    }

    return houses;
}

export async function findByRoomAndBed(minBed, minBedRoom, minBathRoom) {
    let houses;
    try {
        houses = await house.findAll({
            attributes: { exclude },
            where: {
                bed: { [gte]: minBed },
                bedroom: { [gte]: minBedRoom },
                bathroom: { [gte]: minBathRoom }
            },
            limit: maxHouseLimit
        });
    } catch (err) {
        handleError(err);
    }

    return houses;
}
