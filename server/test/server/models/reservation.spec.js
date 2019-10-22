import db from "../../../models/db";
import Sequelize from "sequelize";

describe("Model - Reservation", () => {
    const { between, or } = Sequelize.Op;
    const { reservation } = db;

    afterAll(async done => {
        db.sequelize.close();
        done();
    });

    test("검색하는 체크인/체크아웃에 예약된 숙소를 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const exclude = ["id"];
        const userCheckIn = new Date("2016-10-01 00:00:00 GMT+0900");
        const userCheckOut = new Date("2016-10-03 00:00:00 GMT+0900");

        // when
        const responseData = await reservation.findAll({
            attributes: { exclude },
            // where: { check_in: { [between]: [userCheckIn, userCheckOut] } },
            where: {
                [or]: {
                    check_in: {
                        [between]: [userCheckIn, userCheckOut]
                    },
                    check_out: {
                        [between]: [userCheckIn, userCheckOut]
                    }
                }
            }
        });

        // then
        expect(responseData.length).toBeTruthy();
    });
});
