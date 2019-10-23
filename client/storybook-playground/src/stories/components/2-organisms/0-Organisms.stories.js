import React from "react";
import HouseItem from "./HouseItem";

export default {
    title: "Components|Organisms"
};

// HouseItem's dummy

// Charming Victorian home - twin beds + breakfast
//  https://a0.muscache.com/im/pictures/216165/7555968f_original.jpg?aki_policy=large
// Private room
// 2,1.0,1,2,
// "{Internet,Wifi,""Air conditioning"",Kitchen,""Free parking on premises"",Breakfast,""Pets live on this property"",Cat(s),""Indoor fireplace"",Heating,Washer,Dryer,""Smoke detector"",""Carbon monoxide detector"",""First aid kit"",""Fire extinguisher"",Essentials,Shampoo,Hangers,""Hair dryer"",Iron,""translation missing: en.hosting_amenity_49"",""translation missing: en.hosting_amenity_50"",""Hot water"",""Bed linens"",""Extra pillows and blankets"",""Patio or balcony"",""Garden or backyard"",""Host greets you""}"
//60,19,96
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

export const houseItem = () => <HouseItem data={houseData} />;
