// db.Publisher.sync();
describe("Sequelize - init-database", () => {
    const {
        createTable,
        clearTable,
        createDummyData
    } = require("../../../sql/init-database");
    const { user, house } = require("../../../models/db");

    describe("User", () => {
        test("(IF NOT EXITS)User 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(user);

            // then
            expect(syncResult.name === "user").toBeTruthy();
        });

        test("User 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(user);

            // then
            expect(typeof clearResult === "number").toBeTruthy();
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
            expect(recordLength === createResult.length).toBeTruthy();
        });
    });

    describe("House", () => {
        test("(IF NOT EXITS)House 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(house);

            // then
            expect(syncResult.name === "house").toBeTruthy();
        });

        test("House 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(house);

            // then
            expect(typeof clearResult === "number").toBeTruthy();
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
