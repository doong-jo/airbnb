import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.span`
    font-size: 0.8rem;
    font-weight: 500;
`;

const InfoContainer = styled.div`
    flex-grow: 1;
    flex-shrink: 0;
    border: 1px solid #ccc;
    padding: 0.5rem;
    font-size: 1rem;
    text-align: center;
`;

function DynamicDataBox(props) {
    const { title, type, data } = props;
    const makeContentByType = {
        date: data => {
            const { start, end } = data;
            return start + " → " + end;
        },
        people: data => {
            return data
                .map(v => {
                    const { name, number } = v;
                    return `${name} ${number}명`;
                })
                .join(", ");
        }
    };

    function getInfoContent(type) {
        const result = makeContentByType[type](data);
        return result;
    }

    return (
        <Container>
            <Title>{title}</Title>
            <InfoContainer>{getInfoContent(type)}</InfoContainer>
        </Container>
    );
}

DynamicDataBox.propTypes = {
    data: PropTypes.any.isRequired
};

export default DynamicDataBox;
