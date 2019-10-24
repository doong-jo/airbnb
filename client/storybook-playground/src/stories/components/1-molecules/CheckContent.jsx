import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 1rem;
`;

function CheckContent(props) {
    return (
        <>
            <Container>
                <input type="checkbox" />
                <div>
                    <div>
                        <b>집 전체</b>
                    </div>
                    <div>집 전체를 단독으로 사용합니다</div>
                </div>
            </Container>
        </>
    );
}

CheckContent.propTypes = {};

export default CheckContent;
