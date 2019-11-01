import React from "react";
import CustomCheckBox from "./CheckBox";
import ToggleSwitch from "./ToggleSwitch";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";

export default {
    title: "Components|Atom/Input"
};

export const checkBox = () => {
    function onChange(e) {
        action("checked")(e);
    }

    return (
        <CustomCheckBox
            isChecked={boolean("checked", false)}
            onChange={e => {
                onChange(e);
            }}
        />
    );
};
