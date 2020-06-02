import React from "react";
import { Link } from "react-router-dom";

import styled from "../styles";
import { ReactComponent as VideoSvg } from "../assets/video.svg";

const SRoot = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SVGContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const SLink = styled(Link)`
  font-size: 1.05em;
  padding: 0.35em 1.2em;
  margin: 0.8em 0.3em 0.3em 0;
  border-radius: 0.12em;
  text-align: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary};
  border: 0.1em solid ${(props) => props.theme.colors.primary};
  transition: ${(props) => props.theme.transition.default};
  box-shadow: ${(props) => props.theme.shadow.default};
  font-weight: 500;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.light};
  }

  ${(props) => props.theme.media.tablet} {
    margin: 0em 0.3em 0.3em 0;
  }
`;

const SHeader = styled.h1`
  font-weight: 500;
`;

const Entrance = () => {
  return (
    <SRoot className="container">
      <SHeader>Watch YouTube videos with friends</SHeader>
      <SVGContainer>
        <VideoSvg width="100%" />
      </SVGContainer>
      <SLink to="/room/new">Create room</SLink>
    </SRoot>
  );
};

export default Entrance;
