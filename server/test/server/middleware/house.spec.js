import httpMocks from "node-mocks-http";
import status from "http-status";
import { sequelize } from "../../../models/db";
import { findHouse } from "../../../middleware/house";

describe("Middleware - House", () => {
    afterAll(async done => {
        sequelize.close();
        done();
    });

    test("[체크인/체크아웃, 인원, 가격] 필터로 조회 후 결과를 반환한다.", async () => {
        // given
        const query = {
            checkInOut: [
                new Date("2016-10-01 00:00:00 GMT+0900"),
                new Date("2016-10-03 00:00:00 GMT+0900")
            ],
            capacity: [3],
            price: [0, 100]
        };

        const req = httpMocks.createRequest({
            query
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        // when
        await findHouse(req, res, next);

        // then
        expect(res.get("Content-Type")).toEqual("application/json");
        expect(res.statusCode).toEqual(status.OK);
    });
});
