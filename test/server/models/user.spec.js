describe("Model - User", () => {
    const db = require("../../../models/db");
    const { user } = db;

    test("모든 사용자를 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const exclude = ["id", "password", "createdAt", "updatedAt"];

        // when
        const responseData = await user.findAll({
            attributes: { exclude }
        });

        // // then
        expect(responseData.length).toBeTruthy();
    });

    test("사용자를 아이디로 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const login_id = "dummyId1";

        // when
        const responseData = await user.findOne({ login_id });

        // // then
        expect(responseData).toBeTruthy();
    });

    test("사용자의 하나 이상의 필드 값 수정", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const name = "updatedName";
        const login_id = "dummyId1";

        // when
        const responseData = await user.update(
            { name },
            {
                where: {
                    login_id
                }
            }
        );

        // then
        console.log(responseData);

        expect(responseData.length).toBeTruthy();
    });

    test("사용자를 생성할 수 있다", async () => {
        // given
        const dummy = {
            login_id: "dummyId12345",
            salt: "10",
            password: "Boostcamp1!",
            name: "dummyName4",
            birth: "19940419",
            gender: "남",
            email: "dummy@gmail.com",
            phone: "01012345678",
            favorite: "hobby1,hobby2,hobby3",
            is_admin: false
        };

        // when
        console.log("dummy login_id", dummy.login_id);
        const responseData = await user.create(dummy, { returning: true });

        // then
        expect(responseData).toBeTruthy();
    });
});
