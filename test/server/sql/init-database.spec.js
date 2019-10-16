// db.Publisher.sync();
describe("Sequelize - init-database", () => {
    const {
        createTable,
        clearTable,
        createDummyData
    } = require("../../../sql/init-database");
    const { user, house, sequelize } = require("../../../models/db");

    afterAll(async done => {
        sequelize.close();
        done();
    });

    describe("User", () => {
        test("(IF NOT EXITS)User 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(user);

            // then
            expect(syncResult.name).toEqual("user");
        });

        test("User 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(user);

            // then
            expect(typeof clearResult).toEqual("number");
        });

        test("User 초기 데이터 추가", async () => {
            // given

            // when
            const { recordLength, createResult } = await createDummyData(
                "user",
                user,
                "json"
            );

            // then
            expect(recordLength).toEqual(createResult.length);
        });
    });

    describe("House", () => {
        test("(IF NOT EXITS)House 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(house);

            // then
            expect(syncResult.name).toEqual("house");
        });

        test("House 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(house);

            // then
            expect(typeof clearResult).toEqual("number");
        });

        test("House 초기 데이터 추가", async () => {
            // given

            // when
            const { recordLength, createResult } = await createDummyData(
                "house",
                house,
                "csv"
            );

            // then
            expect(recordLength === createResult.length).toBeTruthy();
        });
    });
});
