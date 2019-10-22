import httpMocks from "node-mocks-http";
import status from "http-status";
import { sequelize } from "../../../models/db";
import { checkExists, signup } from "../../../middleware/user";

describe("Middleware - User", () => {
    afterAll(async done => {
        sequelize.close();
        done();
    });

    test("아이디로 사용자 존재 여부 확인", async () => {
        {
            // given
            const userId = "dummyId1";
            const req = httpMocks.createRequest({
                query: { userId }
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            // when
            await checkExists(req, res, next);

            // then
            expect(res.statusCode).toEqual(status.OK);
        }
        {
            // given
            const userId = "noexistuser";
            const req = httpMocks.createRequest({
                query: { userId }
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            // when
            await checkExists(req, res, next);

            // then
            expect(res.statusCode).toEqual(status.NO_CONTENT);
        }
    });

    test("주어진 정보로 사용자 생성", async () => {
        // given
        const newUser = {
            login_id: "iamnewuser",
            salt: "10",
            password: "Boostcamp1!",
            name: "dummyName1",
            birth: "19940419",
            gender: "남",
            email: "dummy@gmail.com",
            phone: "01012345678",
            favorite: "hobby1,hobby2,hobby3",
            is_admin: false
        };
        const req = httpMocks.createRequest({
            body: newUser
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        // when
        await signup(req, res, next);

        // then
        expect(res.statusCode).toEqual(status.OK);
    });
});
