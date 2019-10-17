import {
    generateToken,
    checkToken,
    checkLoginInfo
} from "../../../services/middleware/auth";
import httpMocks from "node-mocks-http";
import status from "http-status";
import { sequelize } from "../../../models/db";

describe("Middleware - Auth", () => {
    afterAll(async done => {
        sequelize.close();
        done();
    });

    test("JWT를 발급한다.", async () => {
        // given
        const userId = "dummyId1";
        const req = httpMocks.createRequest({
            body: { userId }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        // when
        generateToken(req, res, next);

        // then
        expect(res.userToken).toBeTruthy();
    });

    test("JWT 소유여부를 확인하고 검증한다", async () => {
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
        {
            // given : 올바른 토큰을 가지고 있는 요청
            const userToken = makeMockToken();
            const req = httpMocks.createRequest({
                cookies: { userToken }
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            // when
            checkToken(req, res, next);

            // then
            expect(res.statusCode).toEqual(status.OK);
        }
        {
            // given : 토큰을 가지고 있지 않은 요청
            const req = httpMocks.createRequest({ cookies: {} });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            // when
            checkToken(req, res, next);

            // then
            expect(res.statusCode).toEqual(status.UNAUTHORIZED);
        }
        {
            // given : 유효하지 않은 토큰을 가지고 있는 요청
            const req = httpMocks.createRequest({
                cookies: { userToken: "iaminvalidtoken" }
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            // when
            checkToken(req, res, next);

            // then
            expect(res.statusCode).toEqual(status.INTERNAL_SERVER_ERROR);
        }
    });

    test("로그인 정보(아이디, 비밀번호)를 검증한다.", async () => {
        {
            // given : 유효하지 않은 사용자 정보
            const userId = "234";
            const userPwd = "123!";
            const req = httpMocks.createRequest({
                body: { userId, userPwd }
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            // when
            await checkLoginInfo(req, res, next);

            // then
            expect(res.statusCode).toEqual(status.UNAUTHORIZED);
        }
        {
            // given : 유효한 사용자 정보
            const userId = "dummyId1";
            const userPwd = "Boostcamp1!";
            const req = httpMocks.createRequest({
                body: { userId, userPwd }
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();

            // when
            await checkLoginInfo(req, res, next);

            // then
            expect(res.statusCode).toEqual(status.OK);
        }
    });
});
