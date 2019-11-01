import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

const SecondaryButtonStyle = styled.div`
    display: inline-block;

    & button {
        color: #484848;
        background-color: #fafafa;
        border-color: #2c2c2c;
        min-width: 5rem;
    }

    & button:focus {
        box-shadow: 0;
    }

    & button:active {
        color: #000 !important;
        background-color: #fafafa !important;
        border-color: #2c2c2c !important;
    }

    & button:hover {
        color: #484848;
        background-color: #ccc;
        border-color: #2c2c2c;
    }
`;

function SecondaryButton(props) {
    return (
        <>
            <SecondaryButtonStyle>
                <Button
                    color="secondary"
                    onClick={() => {
                        props.onClick();
                    }}
                >
                    {props.content}
                </Button>
            </SecondaryButtonStyle>
        </>
    );
}

SecondaryButton.propTypes = {
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default SecondaryButton;
