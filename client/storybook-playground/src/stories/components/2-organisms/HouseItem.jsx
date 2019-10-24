import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Slider from "../1-molecules/Slider";
import HouseNameText from "../0-atom/HouseNameText";
import JoinCircleText from "../0-atom/JoinCircleText";
import RatingStar from "../1-molecules/RatingStar";
import PrimaryButton from "../0-atom/PrimaryButton";

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    border: 1px solid #eee;
    border-radius: 0.25rem;
    padding: 0.5rem 0.5rem 0.5rem 0;
    margin: 1rem;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.3);
`;

const ColContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0.5rem;
`;

const StubGrowDiv = styled.div`
    flex-grow: 1;
`;

const RowSideContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

function HouseItem(props) {
    const sliderSettings = {
        dots: true,
        arrows: false,
        autoplay: true
    };
    const {
        name,
        capacity,
        bed,
        bedroom,
        bathroom,
        desc,
        rating,
        reviewCount
    } = props.data;

    return (
        <>
            <RowContainer>
                <Slider
                    settings={sliderSettings}
                    imgs={[
                        "http://placekitten.com/g/300/200",
                        "http://placekitten.com/g/300/200",
                        "http://placekitten.com/g/300/200",
                        "http://placekitten.com/g/300/200",
                        "http://placekitten.com/g/300/200"
                    ]}
                />
                <ColContainer>
                    <HouseNameText content={name} />
                    <JoinCircleText
                        texts={[
                            `인원 ${capacity}명`,
                            `침실 ${bedroom}개`,
                            `침대 ${bed}개`,
                            `욕실 ${bathroom}개`
                        ]}
                    />
                    <JoinCircleText texts={desc} />
                    <StubGrowDiv></StubGrowDiv>
                    <RowSideContainer>
                        <RatingStar rating={rating} reviewCount={reviewCount} />
                        <PrimaryButton content={"예약"} />
                    </RowSideContainer>
                </ColContainer>
            </RowContainer>
        </>
    );
}

HouseItem.propTypes = {
    data: PropTypes.object.isRequired
};

export default HouseItem;
