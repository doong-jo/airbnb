import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CancleSpan = styled.span`
    font-size: 1rem;
    font-weight: bold;
    color: #484848;
    cursor: pointer;
`;

const ConfirmSpan = styled.span`
    font-size: 1rem;
    font-weight: bold;
    color: #008488;
    cursor: pointer;
`;

function FilterModalButton(props) {
    const doPropOnClick = () => {
        props.onClick();
    };
    function getButtonByType(type) {
        const buttons = {
            cancel: (
                <CancleSpan onClick={doPropOnClick}>{props.content}</CancleSpan>
            ),
            confirm: (
                <ConfirmSpan onClick={doPropOnClick}>
                    {props.content}
                </ConfirmSpan>
            )
        };

        return buttons[type];
    }

    return <>{getButtonByType(props.type)}</>;
}

FilterModalButton.propTypes = {
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default FilterModalButton;
