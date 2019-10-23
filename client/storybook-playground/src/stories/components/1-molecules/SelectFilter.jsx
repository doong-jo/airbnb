import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import ToggleButton from "../0-atom/ToggleButton";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
`;

function SelectFilter(props) {
    const getToggleButtons = () => {
        return props.names.map((name, i) => {
            return <ToggleButton key={i} content={name} />;
        });
    };

    return (
        <>
            <Container>{getToggleButtons()}</Container>
        </>
    );
}

SelectFilter.propTypes = {
    names: PropTypes.array
};

export default SelectFilter;
