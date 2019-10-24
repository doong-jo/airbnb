import React from "react";
import { action } from "@storybook/addon-actions";
import Page from "../page";
import ToggleButton from "./ToggleButton";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import InfoButton from "./InfoButton";
import CounterButton from "./CounterButton";
import FilterModalButton from "./FilterModalButton";

const path = "Atom/Button";
export default {
    title: `Components|${path}`
};

export const toggle = () => (
    <Page
        title={"ToggleButton"}
        path={path}
        property={`{
            onClick: [function],
            content: [string]
        }`}
        content={
            <ToggleButton
                onClick={action("Clicked toggle")}
                content={"Hello ToggleButton!"}
            />
        }
    />
);

export const primary = () => (
    <Page
        title={"PrimaryButton"}
        path={path}
        property={`{
            onClick: [function],
            content: [string]
        }`}
        content={
            <PrimaryButton
                onClick={action("Clicked primary")}
                content={"Hello PrimaryButton!"}
            />
        }
    />
);

export const secondary = () => (
    <Page
        title={"SecondaryButton"}
        path={path}
        property={`{
            onClick: [function],
            content: [string]
        }`}
        content={
            <SecondaryButton
                onClick={action("Clicked secondary")}
                content={"Hello SecondaryButton!"}
            />
        }
    />
);

export const info = () => (
    <Page
        title={"InfoButton"}
        path={path}
        property={`{
            onClick: [function],
            content: [string]
        }`}
        content={
            <InfoButton
                onClick={action("Clicked info")}
                content={"Hello InfoButton!"}
            />
        }
    />
);

export const counter = () => (
    <Page
        title={"CounterButton"}
        path={path}
        property={`{ \n
            onClick: [function],
            content: [string]
        }`}
        content={
            <>
                <CounterButton
                    onClick={action("Clicked counter")}
                    content={"+"}
                />
                <br />
                <CounterButton
                    onClick={action("Clicked counter")}
                    content={"-"}
                />
            </>
        }
    />
);

export const filterButton = () => (
    <Page
        title={"FilterModalButton"}
        path={path}
        property={`{ \n
            onClick: [function],
            type: "cancel" | "confirm",
            content: [string]
        }`}
        content={
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
                    onClick={action("Clicked confirm")}
                />
            </>
        }
    />
);
