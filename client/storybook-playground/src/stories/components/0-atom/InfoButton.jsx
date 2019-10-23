import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

function InfoButton(props) {
    return (
        <>
            <Button
                color="info"
                onClick={() => {
                    if (props.onClick) {
                        props.onClick();
                    }
                }}
            >
                {props.content}
            </Button>
        </>
    );
}

InfoButton.propTypes = {
    content: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default InfoButton;
