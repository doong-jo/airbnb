import { findAvailableHouse } from "../../../repo/house-finder";
import db from "../../../models/db";

describe("Repo - House-Filter", () => {
    afterAll(async done => {
        db.sequelize.close();
        done();
    });

    test("검색하는 체크인/체크아웃에 예약 가능한 숙소를 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const userCheckIn = new Date("2016-10-01 00:00:00 GMT+0900");
        const userCheckOut = new Date("2016-10-03 00:00:00 GMT+0900");

        // when
        const row = await findAvailableHouse(userCheckIn, userCheckOut);

        // then
        expect(row.length).toBeTruthy();
    });
});
