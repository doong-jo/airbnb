import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import CounterButton from "../0-atom/CounterButton";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const CounterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Count = styled.span`
    margin-left: 2rem;
    margin-right: 2rem;
    color: #5c5c5c;
    width: 2rem;
    text-align: center;
    user-select: none;
`;

const StubGrowDiv = styled.div`
    flex-grow: 1;
    max-width: 10rem;
`;

const CountTarget = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1rem;
`;

function NumberCounter(props) {
    const [count, setCount] = useState(0);
    const minusChar = "-";
    const plusChar = "+";
    const minusHandler = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const plusHandler = () => {
        setCount(count + 1);
    };

    return (
        <Container>
            <CountTarget>{props.infoText}</CountTarget>
            <StubGrowDiv></StubGrowDiv>
            <CounterContainer>
                <CounterButton content={minusChar} onClick={minusHandler} />
                <Count>
                    {count}
                    {plusChar}
                </Count>
                <CounterButton content={plusChar} onClick={plusHandler} />
            </CounterContainer>
        </Container>
    );
}

NumberCounter.propTypes = {
    infoText: PropTypes.string.isRequired
};

export default NumberCounter;
