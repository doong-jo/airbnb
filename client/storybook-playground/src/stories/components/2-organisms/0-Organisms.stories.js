import React from "react";
import { object } from "@storybook/addon-knobs";
import HouseItem from "./HouseItem";

export default {
    title: "Components|Organisms"
};

const houseData = {
    name: "Charming Victorian home - twin beds + breakfast",
    imgs: [
        "http://placekitten.com/g/300/200",
        "http://placekitten.com/g/300/200"
    ],
    capacity: "3",
    bed: "2",
    bedroom: "1",
    bathroom: "1.5",
    desc: [
        "Internet",
        "Wifi",
        "Air conditioning",
        "Kitchen",
        "Free parking on  premises",
        "Breakfast"
    ],
    rating: 96,
    reviewCount: 19
};

export const houseItem = () => <HouseItem data={object("data", houseData)} />;
