import React from "react";
import { text, number } from "@storybook/addon-knobs";
import CurrencyBox from "./CurrencyBox";

export default {
    title: "Components|Atom/Box"
};

export const currencyBox = () => (
    <CurrencyBox
        currencyType={text("currencyType", "$")}
        amount={number("amount", 100)}
    />
);
