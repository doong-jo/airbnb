import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1rem;
`;

const Star = styled.span`
    font-size: 1rem;
    color: #914669;
`;

const ReviewText = styled.span`
    margin-left: 0.2rem;
    color: #5c5c5c;
`;

function RatingStar(props) {
    const rating = Math.ceil(props.rating / 20);
    const maxStars = 5;

    function getStars() {
        const stars = [];
        for (let i = 1; i <= maxStars; i++) {
            if (rating >= i) {
                stars.push(<Star key={i}>&#9733;</Star>);
                continue;
            }
            stars.push(<Star key={i}>&#9734;</Star>);
        }
        return stars;
    }

    return (
        <>
            <Container>
                <Container>{getStars()}</Container>
                <ReviewText>{props.reviewCount}</ReviewText>
            </Container>
        </>
    );
}

RatingStar.propTypes = {
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired
};

export default RatingStar;
