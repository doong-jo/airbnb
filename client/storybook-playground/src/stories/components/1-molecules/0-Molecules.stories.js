import React, { useState } from "react";
import Page from "../page";
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

const path = "Molecules";
export default {
    title: `Components|${path}`
};

export const selectFilter = () => (
    <Page
        title={"SelectFilter"}
        path={path}
        property={`{
            names: [array]
        }`}
        content={
            <>
                <SelectFilter names={["날짜", "인원", "숙소 유형", "가격"]} />
            </>
        }
    />
);

export const slider = () => (
    <Page
        title={"Slider"}
        path={path}
        dependency={"https://www.npmjs.com/package/react-slick"}
        property={`{
            settings: [object],
            imgs: [array]
        }`}
        content={
            <>
                <Slider
                    settings={{
                        dots: true,
                        arrows: false,
                        autoplay: true
                    }}
                    imgs={[
                        "http://placekitten.com/g/300/200",
                        "http://placekitten.com/g/300/200",
                        "http://placekitten.com/g/300/200",
                        "http://placekitten.com/g/300/200",
                        "http://placekitten.com/g/300/200"
                    ]}
                />
            </>
        }
        note={"외부 모듈에서 CSS를 수정하여 사용 중"}
    />
);
export const ratingStar = () => (
    <Page
        title={"RatingStar"}
        path={path}
        property={`{
            rating: [number],
            reviewCount: [number]
        }`}
        content={<RatingStar rating={80} reviewCount={263} />}
    />
);
export const calendar = () => (
    <Page
        title={"DateRangePicker"}
        path={path}
        dependency={"https://www.npmjs.com/package/react-dates"}
        property={`{
            ...
        }`}
        note={"Unstaged"}
        content={<DateRangePicker />}
    />
);
export const numberCounter = () => (
    <Page
        title={"NumberCounter"}
        path={path}
        property={`{
        infoText: [string]
    }`}
        content={<NumberCounter infoText={"성인"} />}
    />
);
export const rangeBar = () => (
    <Page
        title={"RangeBar"}
        path={path}
        dependency={"https://www.npmjs.com/package/rc-slider"}
        property={`{
            min: [number],
            max: [number],
            defaultValue: [array]
        }`}
        content={<RangeBar min={0} max={1000} defaultValue={[100, 1000]} />}
    />
);

export const priceRange = () => (
    <Page
        title={"PriceRange"}
        path={path}
        property={`{
            currencyType: [string],
            amounts: [array]
        }`}
        content={<PriceRange currencyType={"$"} amounts={[100, 1000]} />}
    />
);

export const RelativeModal_ = () => {
    const [firstModaIOpen, firstOpenModal] = useState(false);
    const firstToggle = () => {
        firstOpenModal(!firstModaIOpen);
    };

    return (
        <Page
            title={"RelativeModal"}
            path={path}
            property={`{
                    isOpen: [boolean],
                    width: [string],
                    toggle: [function],
                    content: [object | string],
                    cancleText: [string],
                    confirmText: [string]
                }`}
            content={
                <div>
                    <Button color="primary" onClick={firstToggle}>
                        Show Modal
                    </Button>
                    <RelativeModal
                        isOpen={firstModaIOpen}
                        width={"15rem"}
                        toggle={firstToggle}
                        content={
                            <>
                                Content1Content1Content1Content1Content1Content1Content1Content1Content1
                            </>
                        }
                        cancleText={"Cancle"}
                        confirmText={"Confirm"}
                    />
                </div>
            }
        />
    );
};

export const checkContent = () => {
    return (
        <Page
            title={"RelativeModal"}
            path={path}
            property={`{
                    isOpen: [boolean],
                    width: [string],
                    toggle: [function],
                    content: [object | string],
                    cancleText: [string],
                    confirmText: [string]
                }`}
            content={<CheckContent />}
        />
    );
};
