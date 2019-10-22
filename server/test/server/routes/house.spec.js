import supertest from "supertest";
import status from "http-status";
const agent = supertest.agent("http://localhost");

describe("Routes - House", () => {
    test("GET /house", async () => {
        // given
        const query = {
            checkInOut: [
                new Date("2016-10-01 00:00:00 GMT+0900"),
                new Date("2016-10-03 00:00:00 GMT+0900")
            ],
            price: [0, 800],
            capacity: [3]
        };

        // when
        const response = await agent.get("/house").query(query);

        // then
        expect(response.header["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(response.body.length > 0).toBeTruthy();
        expect(response.statusCode).toEqual(status.OK);
    });
});
