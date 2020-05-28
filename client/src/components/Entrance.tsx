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

const SLink = styled(Link)`
  font-size: 1.05em;
  padding: 0.35em 1.2em;
  border: 0.1em solid ${(props) => props.theme.primaryColor};
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.12em;
  color: ${(props) => props.theme.primaryColor};
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.secondaryColor};
  }
`;

const Entrance = () => {
  return (
    <SRoot className="container">
      <h1>Watch YouTube videos with friends</h1>
      <VideoSvg width="50%" />
      <SLink to="/room/new">Create room</SLink>
    </SRoot>
  );
};

export default Entrance;
