import React from "react";
import { Link } from "react-router-dom";

import styled from "../styles";
import SContainer from "../styles/Container";

const SHeader = styled.header`
  background: ${(props) => props.theme.primaryColor};
  padding: 0.65em;
  margin-bottom: 1em;
  font-size: 1.1em;
`;

const SLink = styled(Link)`
  color: ${(props) => props.theme.secondaryColor};
`;

const Header = () => {
  return (
    <SHeader>
      <SContainer>
        <SLink to="/">
          <h2>Sharyt</h2>
        </SLink>
      </SContainer>
    </SHeader>
  );
};

export default Header;
