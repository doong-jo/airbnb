import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 24px;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
    }
`;

const SwitchInput = styled.input.attrs({ type: "checkbox" })`
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + ${Slider} {
        background-color: #2196f3;
    }

    &:focus + ${Slider} {
        box-shadow: 0 0 1px #2196f3;
    }

    &:checked + ${Slider}:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`;

function ToggleSwitch(props) {
    const { isChecked } = props;
    return (
        <>
            <Switch>
                <SwitchInput checked={isChecked} />
                <Slider />
            </Switch>
        </>
    );
}

ToggleSwitch.propTypes = {
    isChecked: PropTypes.bool.isRequired
};

ToggleSwitch.defaultProps = {
    isChecked: false
};

export default ToggleSwitch;
