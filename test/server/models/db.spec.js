describe("Model - DB", () => {
    const db = require("../../../models/db");

    afterAll(async done => {
        db.sequelize.close();
        done();
    });

    test("DB는 모든 모델들을 소유하고 있다.", () => {
        // given
        // db는 초기화되었음

        // when
        const isAllExists = db.user !== undefined && db.house !== undefined; // && db.room ...

        // then
        expect(isAllExists).toBeTruthy();
    });
});
