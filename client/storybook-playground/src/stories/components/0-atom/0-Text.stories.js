import React from "react";
import CountResultText from "./CountResultText";
import JoinCircleText from "./JoinCircleText";
import HouseNameText from "./HouseNameText";

export default {
    title: "Components|Atom/Text"
};

// CountResultText's dummy
const resultNumber = 300;
const prefixText = "숙소 ";
export const countResultText = () => (
    <CountResultText prefixText={prefixText} resultNumber={resultNumber} />
);

// JoinCircleText's dummy
const texts = ["인원 3명", "침실 1개", "침대 1개", "욕실 1개"];
export const joinCircleText = () => <JoinCircleText texts={texts} />;

export const houseNameText = () => (
    <HouseNameText content={"Hello HouseName!"} />
);
