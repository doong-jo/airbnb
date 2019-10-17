// db.Publisher.sync();
describe("Sequelize - init-database", () => {
    const {
        createTable,
        clearTable,
        createDummyData
    } = require("../../../sql/init-database");
    const {
        user,
        house,
        reservation,
        sequelize
    } = require("../../../models/db");

    beforeAll(async () => {
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null, {});
    });

    afterAll(async () => {
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null, {});
        sequelize.close();
    });

    describe("전체 테이블 생성", () => {
        test("(IF NOT EXITS)User 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(user);

            // then
            expect(syncResult.name).toEqual("user");
        });

        test("(IF NOT EXITS)House 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(house);

            // then
            expect(syncResult.name).toEqual("house");
        });

        test("(IF NOT EXITS)Reservation 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(reservation);

            // then
            expect(syncResult.name).toEqual("reservation");
        });
    });

    describe("전체 테이블 초기화", () => {
        test("Reservation 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(reservation);

            // then
            expect(typeof clearResult).toEqual("number");
        });

        test("User 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(user);

            // then
            expect(typeof clearResult).toEqual("number");
        });

        test("House 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(house);

            // then
            expect(typeof clearResult).toEqual("number");
        });
    });

    describe("전체 테이블 초기데이터 추가", () => {
        test("User 초기 데이터 추가", async () => {
            // given

            // when
            const { recordLength, createResult } = await createDummyData(user);

            // then
            expect(recordLength).toEqual(createResult.length);
        });

        test("House 초기 데이터 추가", async () => {
            // given

            // when
            const { recordLength, createResult } = await createDummyData(house);

            // then
            expect(recordLength).toEqual(createResult.length);
        });

        test("Reservation 초기 데이터 추가", async () => {
            // given

            // when
            const { recordLength, createResult } = await createDummyData(
                reservation
            );

            // then
            expect(recordLength).toEqual(createResult.length);
        });
    });
});
