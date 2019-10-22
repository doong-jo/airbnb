import db from "../../../models/db";
import Sequelize from "sequelize";

describe("Model - User", () => {
    const { user } = db;
    const { and } = Sequelize.Op;

    afterAll(async done => {
        db.sequelize.close();
        done();
    });

    test("모든 사용자를 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const exclude = ["id", "password", "created_at", "updated_at"];

        // when
        const responseData = await user.findAll({
            attributes: { exclude }
        });

        // then
        expect(responseData.length).toBeTruthy();
    });

    test("아이디/비밀번호가 일치하는 사용자를 조회한다", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const login_id = "dummyId1";
        const password = "Boostcamp1!";

        // when
        const responseData = await user.findOne({
            where: { [and]: { login_id, password } }
        });

        // then
        expect(responseData).toBeTruthy();
    });

    test("사용자를 아이디로 조회한다.", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const login_id = "dummyId1";

        // when
        const responseData = await user.findOne({ where: { login_id } });

        // then
        expect(responseData).toBeTruthy();
    });

    test("사용자의 하나 이상의 필드 값 수정", async () => {
        // given : 데이터는 Test DB에 이미 등록되어 있음
        const name = "dummyId1";
        const login_id = "Boostcamp1!";

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
        const responseData = await user.create(dummy, { returning: true });

        // then
        expect(responseData).toBeTruthy();
    });
});
