import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function CustomCheckBox(props) {
    const { isChecked, onChange, style } = props;

    const Icon = styled.svg`
        fill: none;
        stroke: white;
        stroke-width: 2px;
        opacity: ${isChecked ? 1 : 0};
    `;

    const StyledCheckbox = styled.div`
        display: inline-block;
        vertical-align: middle;
        line-height: 0;
        width: 16px;
        height: 16px;
        background: ${isChecked ? "#008488" : "#fff"};
        border: ${isChecked ? 0 : "1px solid #ccc"};
        border-radius: 3px;
    `;

    return (
        <StyledCheckbox
            style={style}
            onClick={e => {
                onChange(e);
            }}
        >
            <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    );
}

CustomCheckBox.propTypes = {
    isChecked: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    style: PropTypes.object
};

CustomCheckBox.defaultProps = {
    onChange: e => {},
    isChecked: false
};

export default CustomCheckBox;
