import httpMocks from "node-mocks-http";
import supertest from "supertest";
import status from "http-status";
const agent = supertest.agent("http://localhost");
import { generateToken } from "../../../services/middleware/auth";

describe("Routes - Auth", () => {
    test("POST /auth/passport", async () => {
        // given
        function makeMockToken() {
            // 테스트를 위한 token 생성
            const userId = "dummyId1";
            const req = httpMocks.createRequest({
                body: { userId }
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();
            generateToken(req, res, next);
            return res.userToken;
        }
        const token = makeMockToken();
        // when
        const response = await agent
            .post("/auth/passport")
            .set("Cookie", [`userToken=${token}`]);

        // then
        expect(response.statusCode).toEqual(status.OK);
    });

    test("POST /auth/login", async () => {
        // given
        const userId = "dummyId1";
        const userPwd = "Boostcamp1!";

        // when
        const response = await agent
            .post("/auth/login")
            .send({ userId, userPwd });

        // then
        expect(response.statusCode).toEqual(status.OK);
        expect(response.userToken).toBeTruthy();
    });
});
