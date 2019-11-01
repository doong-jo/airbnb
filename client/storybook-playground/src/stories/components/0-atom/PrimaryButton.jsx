import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

const PrimaryButtonStyle = styled.div`
    display: inline-block;

    & button {
        background-color: #ff595f;
        border-color: #ff595f;
        min-width: 5rem;
    }

    & button:focus {
        box-shadow: 0 0 0 0.2rem rgba(199, 55, 55, 0.5);
    }

    & button:active {
        background-color: #ff595f !important;
        border-color: #ff595f !important;
        box-shadow: 0 0 0 0.2rem rgba(199, 55, 55, 0.5) !important;
    }

    & button:hover {
        color: #fff;
        background-color: rgba(199, 55, 55, 1);
        border-color: #ff595f;
    }
`;

function PrimaryButton(props) {
    return (
        <>
            <PrimaryButtonStyle>
                <Button
                    color="primary"
                    onClick={() => {
                        props.onClick();
                    }}
                >
                    {props.content}
                </Button>
            </PrimaryButtonStyle>
        </>
    );
}

PrimaryButton.propTypes = {
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default PrimaryButton;
