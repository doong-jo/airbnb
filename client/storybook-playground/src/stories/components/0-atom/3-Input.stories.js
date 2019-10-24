import React from "react";
import Page from "../page";
import { action } from "@storybook/addon-actions";
import CheckBox from "./CheckBox";

const path = "Atom/Input";
export default {
    title: `Components|${path}`
};

export const currencyBox = () => (
    <Page
        title={"CurrencyBox"}
        path={path}
        property={`{
            currencyType: [string],
            amount: [number]
        }`}
        content={<CheckBox />}
    />
);
