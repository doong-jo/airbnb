import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const H3 = styled.h3`
    color: #2c2c2c;
`;
function CountResultText(props) {
    return (
        <>
            <H3>
                {props.prefixText}
                {props.resultNumber}
            </H3>
        </>
    );
}

CountResultText.propTypes = {
    resultNumber: PropTypes.number.isRequired,
    prefixText: PropTypes.string
};

export default CountResultText;
