import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { action } from "@storybook/addon-actions";

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually

function CustomCheckBox(props) {
    const Icon = styled.svg`
        fill: none;
        stroke: white;
        stroke-width: 2px;
    `;

    const CheckboxContainer = styled.div`
        display: inline-block;
        vertical-align: middle;
    `;

    const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
        border: 0;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    `;

    const StyledCheckbox = styled.div`
        display: inline-block;
        width: 16px;
        height: 16px;
        background: ${props => (props.checked ? "#008488" : "white")};
        border-radius: 3px;
        transition: all 150ms;

        ${HiddenCheckbox}:focus + & {
            box-shadow: 0 0 0 3px gray;
        }

        ${Icon} {
            visibility: ${props => (props.checked ? "visible" : "hidden")};
        }
    `;

    const [checked, setChecked] = useState(true);

    function handleCheckboxChange(event) {
        action("hi");
        setChecked({ checked: event.target.checked });
    }

    return (
        <CheckboxContainer>
            <HiddenCheckbox
                checked={checked}
                {...props}
                onChange={handleCheckboxChange}
            />
            <StyledCheckbox checked={checked}>
                <Icon viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                </Icon>
            </StyledCheckbox>
        </CheckboxContainer>
    );
}

CustomCheckBox.propTypes = {
    isCheck: PropTypes.bool,
    checked: PropTypes.bool,
    toggle: PropTypes.func
};

CustomCheckBox.defaultProps = {
    isCheck: false
};

export default CustomCheckBox;
