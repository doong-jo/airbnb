import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Span = styled.span`
    display: inline-block;
    padding: 0.7rem 0.6rem 0.7rem 0.6rem;
    width: 9rem;
    border: 1px solid #e1e1e1;
    border-radius: 0.25rem;
    user-select: none;
`;
function CurrencyBox(props) {
    return (
        <>
            <Span>
                {props.currencyType}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {props.amount}
                {props.noLimit ? "+" : ""}
            </Span>
        </>
    );
}

CurrencyBox.propTypes = {
    currencyType: PropTypes.string.isRequired,
    amount: PropTypes.number,
    noLimit: PropTypes.bool
};

export default CurrencyBox;
