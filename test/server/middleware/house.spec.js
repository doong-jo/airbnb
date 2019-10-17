import httpMocks from "node-mocks-http";
import status from "http-status";
import { sequelize } from "../../../models/db";
import {
    conveyByPeople,
    conveyByType,
    conveyByPriceRange,
    conveyByRoomAndBed
} from "../../../services/middleware/house";

describe("Middleware - House", () => {
    afterAll(async done => {
        sequelize.close();
        done();
    });

    test("인원으로 숙소를 조회 후 결과를 반환한다.", async () => {
        // given
        const adult = 2;
        const child = 1;
        const baby = 1;
        const req = httpMocks.createRequest({
            query: { adult, child, baby }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        // when
        await conveyByPeople(req, res, next);

        // then
        expect(res.get("Content-Type")).toEqual("application/json");
        expect(res.statusCode).toEqual(status.OK);
    });

    test("유형으로 숙소를 조회 후 결과를 반환한다.", async () => {
        // given
        const type = "Hotel room";
        const req = httpMocks.createRequest({
            query: { type }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        // when
        await conveyByType(req, res, next);

        // then
        expect(res.get("Content-Type")).toEqual("application/json");
        expect(res.statusCode).toEqual(status.OK);
    });

    test("최소/최대 금액 값으로 숙소를 조회 후 결과를 반환한다.", async () => {
        // given
        const minPrice = 50;
        const maxPrice = 70;
        const req = httpMocks.createRequest({
            query: { minPrice, maxPrice }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        // when
        await conveyByPriceRange(req, res, next);

        // then
        expect(res.get("Content-Type")).toEqual("application/json");
        expect(res.statusCode).toEqual(status.OK);
    });

    test("침대/침실/욕실로 숙소를 조회 후 결과를 반환한다.", async () => {
        // given
        const minBed = 2;
        const minBedRoom = 2;
        const minBathRoom = 1;
        const req = httpMocks.createRequest({
            query: { minBed, minBedRoom, minBathRoom }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        // when
        await conveyByRoomAndBed(req, res, next);

        // then
        expect(res.get("Content-Type")).toEqual("application/json");
        expect(res.statusCode).toEqual(status.OK);
    });
});
