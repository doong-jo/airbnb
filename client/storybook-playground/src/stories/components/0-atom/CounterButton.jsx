import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    border-radius: 50%;
    border: 2px solid #008488;
    display: table;
    height: 3rem;
    width: 3rem;
    text-align: center;
    cursor: pointer;
    overflow: hidden;

    &:active {
        border-color: #008488 !important;
        opacity: 0.5;
    }

    transition: border-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
`;

const Span = styled.span`
    display: table-cell;
    vertical-align: middle;
    font-size: 1.5rem;
    color: #008488;
    user-select: none;
`;

function CounterButton(props) {
    return (
        <>
            <Container
                onClick={() => {
                    if (props.onClick) {
                        props.onClick();
                    }
                }}
            >
                <Span>{props.content}</Span>
            </Container>
        </>
    );
}

CounterButton.propTypes = {
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default CounterButton;
