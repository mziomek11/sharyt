import React from "react";
import { Link } from "react-router-dom";

import styled from "../styles";

const SHeader = styled.header`
  background: ${(props) => props.theme.primaryColor};
  padding: 0.65em;
  margin-bottom: 1.5em;
`;

const SLink = styled(Link)`
  color: ${(props) => props.theme.secondaryColor};
`;

const Header = () => {
  return (
    <SHeader>
      <div className="container">
        <SLink to="/">
          <h2>Sharyt</h2>
        </SLink>
      </div>
    </SHeader>
  );
};

export default Header;
