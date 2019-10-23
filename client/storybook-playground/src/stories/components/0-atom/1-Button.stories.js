import React from "react";
import { action } from "@storybook/addon-actions";
import ToggleButton from "./ToggleButton";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import InfoButton from "./InfoButton";

export default {
    title: "Components|Atom/Button"
};

export const toggle = () => (
    <ToggleButton
        onClick={action("Clicked toggle")}
        content={"Hello ToggleButton!"}
    />
);

export const primary = () => (
    <PrimaryButton
        onClick={action("Clicked reserve")}
        content={"Hello PrimaryButton!"}
    />
);

export const secondary = () => (
    <SecondaryButton
        onClick={action("Clicked reserve")}
        content={"Hello SecondaryButton!"}
    />
);

export const info = () => (
    <InfoButton
        onClick={action("Clicked reserve")}
        content={"Hello SecondaryButton!"}
    />
);
