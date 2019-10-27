import React, { useState } from "react";
import { text, number, object, array } from "@storybook/addon-knobs";
import { Button } from "reactstrap";
import SelectFilter from "./SelectFilter";
import Slider from "./Slider";
import RatingStar from "./RatingStar";
import DateRangePicker from "./DateRangePicker/DateRangePicker";
import NumberCounter from "./NumberCounter";
import RangeBar from "./RangeBar";
import PriceRange from "./PriceRange";
import RelativeModal from "./RelativeModal";
import CheckContent from "./CheckContent";

export default {
    title: "Components|Molecules"
};

export const selectFilter = () => (
    <SelectFilter
        names={array("names", ["날짜", "인원", "숙소 유형", "가격"])}
    />
);

export const slider = () => (
    <Slider
        settings={object("settings", {
            dots: true,
            arrows: false,
            autoplay: true
        })}
        imgs={array("imgs", [
            "http://placekitten.com/g/300/200",
            "http://placekitten.com/g/300/200",
            "http://placekitten.com/g/300/200",
            "http://placekitten.com/g/300/200",
            "http://placekitten.com/g/300/200"
        ])}
    />
);
export const ratingStar = () => (
    <RatingStar
        rating={number("rating", 80)}
        reviewCount={number("reviewCount", 263)}
    />
);
export const calendar = () => <DateRangePicker />;
export const numberCounter = () => (
    <NumberCounter infoText={text("InfoText", "성인")} />
);
export const rangeBar = () => (
    <RangeBar
        min={number("min", 0)}
        max={number("max", 1000)}
        defaultValue={array("defaultValue", [100, 1000])}
    />
);

export const priceRange = () => (
    <PriceRange
        currencyType={text("currencyType", "$")}
        amounts={array("amounts", [100, 1000])}
    />
);

export const RelativeModal_ = () => {
    const [firstModaIOpen, firstOpenModal] = useState(false);
    const firstToggle = () => {
        firstOpenModal(!firstModaIOpen);
    };

    return (
        <>
            <Button color="primary" onClick={firstToggle}>
                Show Modal
            </Button>
            <RelativeModal
                isOpen={firstModaIOpen}
                width={text("width", "15rem")}
                toggle={firstToggle}
                content={
                    <>
                        Content1Content1Content1Content1Content1Content1Content1Content1Content1
                    </>
                }
                cancelText={text("cancleText", "Cancle")}
                confirmText={text("confirmText", "Confirm")}
            />
        </>
    );
};

export const checkContent = () => {
    return <CheckContent />;
};
