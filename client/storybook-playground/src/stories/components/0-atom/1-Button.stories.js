import React from "react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import ToggleButton from "./ToggleButton";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import InfoButton from "./InfoButton";
import CounterButton from "./CounterButton";
import FilterModalButton from "./FilterModalButton";

export default {
    title: "Components|Atom/Button"
};

export const toggle = () => (
    <ToggleButton
        onClick={action("Clicked toggle")}
        content={text("content", "Hello ToggleButton!")}
    />
);

export const primary = () => (
    <PrimaryButton
        onClick={action("Clicked primary")}
        content={text("content", "Hello PrimaryButton!")}
    />
);

export const secondary = () => (
    <SecondaryButton
        onClick={action("Clicked secondary")}
        content={text("content", "Hello SecondaryButton!")}
    />
);

export const info = () => (
    <InfoButton
        onClick={action("Clicked info")}
        content={text("content", "Hello InfoButton!")}
    />
);

export const counter = () => (
    <>
        <CounterButton
            onClick={action("Clicked minus counter")}
            content={text("first couter content", "+")}
        />
        <br />
        <CounterButton
            onClick={action("Clicked plus counter")}
            content={text("second couter content", "-")}
        />
    </>
);

export const filterButton = () => (
    <>
        <FilterModalButton
            type={"cancel"}
            content={"삭제"}
            onClick={action("Clicked cancel")}
        />
        <br />
        <FilterModalButton
            type={"confirm"}
            content={"저장"}
            onClick={action("Clicked cancel")}
        />
    </>
);
