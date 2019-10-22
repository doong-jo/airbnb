import db from "../models/db";
import Sequelize from "sequelize";

const { gte, lte, notBetween, and } = Sequelize.Op;

export default {
    checkInOut(inDate, outDate) {
        const condition = {
            include: [
                {
                    model: db.reservation,
                    attributes: ["check_in", "check_out"],
                    where: {
                        [and]: {
                            check_in: { [notBetween]: [inDate, outDate] },
                            check_out: { [notBetween]: [inDate, outDate] }
                        }
                    }
                }
            ]
        };

        return condition;
    },

    capacity(cap) {
        const condition = {
            where: { capacity: { [gte]: cap } }
        };

        return condition;
    },

    type(roomType) {
        const condition = {
            where: { type: roomType }
        };

        return condition;
    },

    price(min, max) {
        const condition = {
            where: {
                price: {
                    [gte]: min,
                    [lte]: max
                }
            }
        };

        return condition;
    },

    bed(minBed, minBedRoom, minBathRoom) {
        const condition = {
            where: {
                bed: { [gte]: minBed },
                bedroom: { [gte]: minBedRoom },
                bathroom: { [gte]: minBathRoom }
            }
        };

        return condition;
    }
};
