import React, { useState } from "react";
import { text, number, object, array } from "@storybook/addon-knobs";
import { Button } from "reactstrap";
import { action } from "@storybook/addon-actions";
import SelectFilter from "./SelectFilter";
import Slider from "./Slider";
import RatingStar from "./RatingStar";
import DateRangePicker from "./DateRangePicker/DateRangePicker";
import NumberCounter from "./NumberCounter";
import RangeBar from "./RangeBar";
import PriceRange from "./PriceRange";
import RelativeModal from "./RelativeModal";
import CheckContent from "./CheckContent";
import DynamicDataBox from "./DynamicDataBox";

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
    return (
        <CheckContent
            data={object("data", [
                {
                    onChange: action("check"),
                    title: "집 전체",
                    content: "집 전체를 단독으로 사용합니다."
                },
                {
                    onChange: action("check"),
                    title: "개인실",
                    content:
                        "침실은 단독으로 쓰고, 이외의 공간은 호스트나 다른 게스트와 함께 이용할 수도 있습니다."
                }
            ])}
        />
    );
};

export const dynamicDataBoxOfDate = () => {
    return (
        <>
            <DynamicDataBox
                title={"날짜"}
                type={"date"}
                data={{ start: "2020/01/04", end: "2020/01/21" }}
            />
        </>
    );
};

export const dynamicDataBoxOfPeople = () => {
    return (
        <>
            <DynamicDataBox
                title={"인원"}
                type={"people"}
                data={[
                    { name: "게스트", number: 1 },
                    { name: "유아", number: 1 }
                ]}
            />
        </>
    );
};
