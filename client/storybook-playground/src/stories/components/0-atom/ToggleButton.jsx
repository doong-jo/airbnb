import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button`
    color: #2c2c2c;
    background-color: #ffffff;
    border-color: #e4e7e7;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
        outline: 0;
    }
    ${props =>
        props.isEnabled &&
        css`
            background-color: #17a2b8;
            border-color: #17a2b8;
            color: #ffffff;
        `};

    ${props =>
        !props.isEnabled &&
        css`
            &:hover {
                color: #777777;
                background-color: #f2f2f2;
                border-color: #f2f2f2;
            }
        `};

    & + button {
        margin-left: 1rem;
    }
`;
function ToggleButton(props) {
    const { isEnabled } = props;

    return (
        <>
            <Button
                isEnabled={isEnabled}
                onClick={() => {
                    props.onClick();
                }}
            >
                {props.content}
            </Button>
        </>
    );
}

ToggleButton.propTypes = {
    content: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ToggleButton;
