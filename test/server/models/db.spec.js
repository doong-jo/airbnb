describe("Model - DB", () => {
    let db;
    beforeAll(() => {
        db = require("../../../models/db");
    });

    test("DB는 모든 모델들을 소유하고 있다.", () => {
        // given
        // db는 초기화되었음

        // when
        const isAllExists = db.user !== undefined && db.house !== undefined; // && db.room ...

        // then
        console.dir("db has models: ", db);
        expect(isAllExists).toBeTruthy();
    });
});
