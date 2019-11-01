import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const H3 = styled.h3`
    color: #2c2c2c;
`;

const Link = styled.a`
    &:focus {
        color: #3c9da1;
    }

    &:hover {
        text-decoration: none;
    }
`;

const Text = styled.span`
    font-size: 0.8rem;
    color: #3c9da1;
    font-weight: 300;
`;
function LinkText(props) {
    const { href, description } = props;

    return (
        <>
            <Link href={href} target={"_blank"}>
                <Text>{description}</Text>
            </Link>
        </>
    );
}

LinkText.propTypes = {
    href: PropTypes.string.isRequired
};

export default LinkText;
