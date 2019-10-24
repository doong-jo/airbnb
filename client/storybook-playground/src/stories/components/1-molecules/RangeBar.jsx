import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Range } from "rc-slider";

const Container = styled.div`
    margin: 1rem;

    & .rc-slider-handle.rc-slider-handle::before {
        content: "|||";
        position: relative;
        color: #008488;
        display: table-cell;
        vertical-align: bottom;
        font-size: 0.5rem;
        top: -0.2rem;
    }
`;

function RangeBar(props) {
    const handleStyle = {
        display: "table",
        width: "1.5rem",
        height: "1.5rem",
        borderColor: "#008488",
        borderWidth: "1px",
        top: 0,
        textAlign: "center",
        "box-shadow": "0px 2px 5px gray"
    };

    const railStyle = {
        backgroundColor: "#D8D8D8"
    };

    const trackStyle = [
        {
            backgroundColor: "#008488"
        }
    ];

    const { min, max, defaultValue } = props;

    return (
        <>
            <Container>
                <Range
                    min={min}
                    max={max}
                    defaultValue={defaultValue}
                    tipFormatter={value => `$${value}`}
                    railStyle={railStyle}
                    trackStyle={trackStyle}
                    handleStyle={[handleStyle, handleStyle]}
                    pushable={true}
                />
            </Container>
        </>
    );
}

RangeBar.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    defaultValue: PropTypes.array.isRequired
};

export default RangeBar;
