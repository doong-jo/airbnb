describe("Model - House", () => {
    const db = require("../../../models/db");
    const Sequelize = require("sequelize");
    const { gte, lte } = Sequelize.Op;
    const { house } = db;

    afterAll(async done => {
        db.sequelize.close();
        done();
    });

    test("인원으로 숙소를 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const exclude = ["uid", "created_at", "updated_at"];
        const reqPerson = 3;

        // when
        const responseData = await house.findAll({
            attributes: { exclude },
            where: {
                capacity: {
                    [gte]: reqPerson
                }
            },
            logging: false
        });

        // then
        expect(responseData.length).toBeTruthy();
    });

    test("유형으로 숙소를 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const exclude = ["uid", "created_at", "updated_at"];
        const type = "Hotel room";

        // when
        const responseData = await house.findAll({
            attributes: { exclude },
            where: { type },
            logging: false
        });

        // then
        expect(responseData.length).toBeTruthy();
    });

    test("최소/최대 금액 값으로 숙소를 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const exclude = ["uid", "created_at", "updated_at"];
        const minPrice = 50;
        const maxPrice = 70;

        // when
        const responseData = await house.findAll({
            attributes: { exclude },
            where: {
                price: {
                    [gte]: minPrice,
                    [lte]: maxPrice
                }
            },
            logging: false
        });

        // then
        expect(responseData.length).toBeTruthy();
    });

    test("침대/침실/욕실로 숙소를 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const exclude = ["uid", "created_at", "updated_at"];
        const minBed = 2;
        const minBedRoom = 2;
        const minBathRoom = 1;

        // when
        const responseData = await house.findAll({
            attributes: { exclude },
            where: {
                bed: {
                    [gte]: minBed
                },
                bedroom: {
                    [gte]: minBedRoom
                },
                bathroom: {
                    [gte]: minBathRoom
                }
            },
            logging: false
        });

        // then
        expect(responseData.length).toBeTruthy();
    });
});
