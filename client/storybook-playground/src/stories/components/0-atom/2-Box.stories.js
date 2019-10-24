import React from "react";
import Page from "../page";
import { action } from "@storybook/addon-actions";
import CurrencyBox from "./CurrencyBox";

const path = "Atom/Box";
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
        content={<CurrencyBox currencyType={"$"} amount={100} />}
    />
);
