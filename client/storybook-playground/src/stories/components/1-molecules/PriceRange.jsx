import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import CurrencyBox from "../0-atom/CurrencyBox";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Span = styled.span`
    margin-left: 1rem;
    margin-right: 1rem;
    user-select: none;
`;

function PriceRange(props) {
    const { currencyType, amounts } = props;

    const startAmount = amounts[0];
    const endAmount = amounts[1];

    return (
        <Container>
            <CurrencyBox currencyType={currencyType} amount={startAmount} />
            <Span>-</Span>
            <CurrencyBox
                noLimit
                currencyType={currencyType}
                amount={endAmount}
            />
        </Container>
    );
}

PriceRange.propTypes = {
    currencyType: PropTypes.string.isRequired,
    amounts: PropTypes.array.isRequired
};

export default PriceRange;
