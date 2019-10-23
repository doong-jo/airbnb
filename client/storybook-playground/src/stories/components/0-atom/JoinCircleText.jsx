import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Span = styled.span`
    color: #5c5c5c;
`;

function JoinCircleText(props) {
    return (
        <>
            <Span>{props.texts.join(" ・ ")}</Span>
        </>
    );
}

JoinCircleText.propTypes = {
    texts: PropTypes.array.isRequired
};

export default JoinCircleText;
