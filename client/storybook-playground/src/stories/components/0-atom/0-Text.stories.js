import React from "react";
import Page from "../page";
import CountResultText from "./CountResultText";
import JoinCircleText from "./JoinCircleText";
import HouseNameText from "./HouseNameText";

const path = "Atom/Text";
export default {
    title: `Components|${path}`
};

export const countResultText = () => (
    <Page
        title={"CounterResultText"}
        path={path}
        property={`{
                resultNumber: [number],
                prefixText: [string]
            }`}
        content={<CountResultText prefixText={"숙소 "} resultNumber={300} />}
    />
);

export const joinCircleText = () => (
    <Page
        title={"JoinCircleText"}
        path={path}
        property={`{
                texts: [string]
            }`}
        content={
            <JoinCircleText
                texts={["인원 3명", "침실 1개", "침대 1개", "욕실 1개"]}
            />
        }
    />
);

export const houseNameText = () => (
    <Page
        title={"HouseNameText"}
        path={path}
        property={`{
            content: [string]
        }`}
        content={<HouseNameText content={"Hello HouseName!"} />}
    />
);
