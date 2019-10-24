import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FilterModalButton from "../0-atom/FilterModalButton";

const FilterModalBody = styled.div`
    overflow: auto;
    word-break: break-word;
`;
const FilterModalFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
`;

function RelativeModal(props) {
    const { toggle, content, cancleText, confirmText } = props;
    const FilterModalBackdrop = styled.div`
        display: ${!props.isOpen ? "none" : "block"};
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        opacity: 0.5;
    `;
    const FilterModal = styled.div`
        display: ${!props.isOpen ? "none" : "block"};
        position: absolute;
        width: ${props.width};
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        padding: 1.5rem;
        margin-top: 1rem;
    `;
    return (
        <>
            <FilterModalBackdrop></FilterModalBackdrop>
            <FilterModal>
                <FilterModalBody>{content}</FilterModalBody>
                <FilterModalFooter>
                    <FilterModalButton
                        type={"cancel"}
                        content={cancleText}
                        onClick={toggle}
                    />
                    <FilterModalButton
                        type={"confirm"}
                        content={confirmText}
                        onClick={toggle}
                    />
                </FilterModalFooter>
            </FilterModal>
        </>
    );
}

RelativeModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    content: PropTypes.object,
    cancleText: PropTypes.string,
    confirmText: PropTypes.string,
    toggle: PropTypes.func.isRequired
};

export default RelativeModal;
