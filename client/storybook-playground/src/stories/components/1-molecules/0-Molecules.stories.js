import React from "react";
import SelectFilter from "./SelectFilter";
import Slider from "./Slider";
import RatingStar from "./RatingStar";
import DateRangePicker from "./DateRangePicker/DateRangePicker";

export default {
    title: "Components|Molecules"
};

// SelectFilter's dummy
const filterNames = ["날짜", "인원", "숙소 유형", "가격"];

// Slider's dummy
const settings = {
    dots: true,
    arrows: false,
    autoplay: true
};

// RatingStart's dummy
const rating = 80;
const reviewCount = 263;

export const selectFilter = () => <SelectFilter names={filterNames} />;
export const slider = () => <Slider settings={settings} />;
export const ratingStar = () => (
    <RatingStar rating={rating} reviewCount={reviewCount} />
);
export const calendar = () => <DateRangePicker />;
