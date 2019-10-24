import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Slider from "react-slick";

const SliderContainer = styled.div`
    width: 20rem;
    height: auto;

    & .slick-slider {
        line-height: 0;
    }

    & .slick-slider img {
        border-radius: 0.5rem;
        margin: auto;
    }

    & .slick-dots {
        bottom: 20px;
    }

    & .slick-dots li button:before {
        color: white;
    }

    & .slick-dots li.slick-active button:before {
        color: white;
        opacity: 1;
    }

    & .slick-dots li button:before {
        opacity: 0.5;
    }
`;

function slider(props) {
    function getImageItems() {
        return props.imgs.map((img, i) => {
            return (
                <div>
                    <img alt={i} src={img} />
                </div>
            );
        });
    }
    return (
        <>
            <SliderContainer>
                <Slider {...props.settings}>{getImageItems()}</Slider>
            </SliderContainer>
        </>
    );
}

slider.propTypes = {
    settings: PropTypes.object
};

export default slider;
