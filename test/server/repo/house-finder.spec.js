import houseFinder from "../../../repo/house-finder";
import db from "../../../models/db";

describe("Repo - House-Finder 하나 이상의 예약 가능한 숙소를 조회한다.", () => {
    afterAll(async done => {
        db.sequelize.close();
        done();
    });

    test("[체크인/체크아웃, 인원]을 기준으로 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const checkInOut = [
            new Date("2016-10-01 00:00:00 GMT+0900"),
            new Date("2016-10-03 00:00:00 GMT+0900")
        ];
        const capacity = [3];

        // when
        const row = await houseFinder.find({
            checkInOut,
            capacity
        });

        // then
        expect(row.length).toBeTruthy();
    });

    test("[체크인/체크아웃, 인원, 유형, 가격, 침실 구성]을 기준으로 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const checkInOut = [
            new Date("2016-10-01 00:00:00 GMT+0900"),
            new Date("2016-10-03 00:00:00 GMT+0900")
        ];
        const capacity = [3];
        const type = ["Entire home/apt"];
        const price = [0, 800];
        const bed = [2, 2, 2];

        // when
        const row = await houseFinder.find({
            checkInOut,
            capacity,
            type,
            price,
            bed
        });

        // then
        expect(row.length).toBeTruthy();
    });
});
