import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function CheckBox(props) {
    const CheckBox = styled.input`
        type: checkbox;
    `;

    return (
        <>
            <CheckBox />
        </>
    );
}

CheckBox.propTypes = {
    isCheck: PropTypes.bool
};

CheckBox.defaultProps = {
    isCheck: false
};

export default CheckBox;
