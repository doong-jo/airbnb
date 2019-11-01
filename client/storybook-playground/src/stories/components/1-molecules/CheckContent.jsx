import React, { useState } from "react";
import styled from "styled-components";
import CustomCheckBox from "../0-atom/CheckBox";
import PropTypes from "prop-types";

const Container = styled.div`
    display: row;
    flex-direction: column;
    font-size: 1rem;
    padding: 1rem;
`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CheckItemTitle = styled.div`
    font-weight: bold;
`;

const CheckBoxStyle = {
    marginTop: "0.25rem",
    marginRight: "0.5rem",
    "user-select": "none"
};

function CheckContent(props) {
    const { data } = props;
    const [checks, setChecks] = useState(
        props.data.map(() => {
            return false;
        })
    );

    function getCheckItems() {
        return data.map((v, i) => {
            const { content, title, onChange } = v;

            return (
                <Container key={i}>
                    <ItemContainer>
                        <CustomCheckBox
                            style={CheckBoxStyle}
                            isChecked={checks[i]}
                            onChange={e => {
                                onChange(e);
                                setChecks(
                                    checks.map((v, ind) => {
                                        return i === ind ? !v : v;
                                    })
                                );
                            }}
                        />
                        <ContentContainer>
                            <CheckItemTitle>{title}</CheckItemTitle>
                            {content}
                        </ContentContainer>
                    </ItemContainer>
                </Container>
            );
        });
    }

    return <>{getCheckItems()}</>;
}

CheckContent.propTypes = {
    /** [{title, content}, ...] */
    data: PropTypes.array.isRequired
};

CheckContent.defaultProps = {
    data: []
};
export default CheckContent;
