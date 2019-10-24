import React from "react";
import Page from "../page";
import HouseItem from "./HouseItem";

const path = "Organisms";
export default {
    title: `Components|${path}`
};

const houseData = {
    name: "Charming Victorian home - twin beds + breakfast",
    image:
        "https://a0.muscache.com/im/pictures/216165/7555968f_original.jpg?aki_policy=large",
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

export const houseItem = () => (
    <Page
        title={"RatingStar"}
        path={path}
        property={`{
            data: [object]
        }`}
        content={<HouseItem data={houseData} />}
    />
);
