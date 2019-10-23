import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const H5 = styled.h5`
    color: #2c2c2c;
`;
function HouseNameText(props) {
    return (
        <>
            <H5>{props.content}</H5>
        </>
    );
}

HouseNameText.propTypes = {
    content: PropTypes.string.isRequired
};

export default HouseNameText;
