import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 2rem 3rem 2rem 3rem;
    box-shadow: 0 4px 2px -2px gray;
    line-height: 3rem;
`;

const Preview = styled.div`
    margin-top: 1rem;
    padding: 2rem;
    border: 2px dotted #ccc;
`;

const Property = styled.div`
    display: inline;
    border-bottom: 2px solid #1cacf4;
    font-weight: bold;
    padding: 0.2rem;
    margin-right: 0.5rem;
`;

function Page(props) {
    return (
        <>
            <Container>
                <h5>{props.path}</h5>
                <h1>{props.title}</h1>
                <div>
                    {props.dependency ? (
                        <span>
                            <Property>Dependency</Property>
                            <a href={props.dependency}>{props.dependency}</a>
                        </span>
                    ) : (
                        ""
                    )}
                </div>
                <div>
                    <Property>Prop</Property>
                    {props.property}
                </div>
                <div>
                    {props.note ? (
                        <span>
                            <Property>Note</Property>
                            {props.note}
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            </Container>
            <Preview>{props.content}</Preview>
        </>
    );
}

export default Page;
