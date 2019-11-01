import React from "react";
import { text, number, array } from "@storybook/addon-knobs";
import CountResultText from "./CountResultText";
import JoinCircleText from "./JoinCircleText";
import HouseNameText from "./HouseNameText";
import LinkText from "./LinkText";

export default {
    title: "Components|Atom/Text"
};

export const countResultText = () => (
    <CountResultText
        prefixText={text("prefixText", "숙소 ")}
        resultNumber={number("resultNumber", 300)}
    />
);

export const joinCircleText = () => (
    <JoinCircleText
        texts={array("texts", ["인원 3명", "침실 1개", "침대 1개", "욕실 1개"])}
    />
);

export const houseNameText = () => (
    <HouseNameText content={text("content", "Hello HouseName!")} />
);

export const linkText = () => (
    <LinkText
        href={text("href", "https://www.airbnb.co.kr/")}
        description={text("description", "더 알아보기")}
    />
);
