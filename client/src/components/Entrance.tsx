import React from "react";
import styled from "styled-components";

import EntranceButton from "./EntranceButton";
import { ReactComponent as VideoSvg } from "../assets/video.svg";

const SRoot = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const SHeading = styled.h1`
  margin-bottom: 1em;
`;

const Entrance = () => {
  return (
    <SRoot>
      <SHeading>Watch YouTube videos with friends</SHeading>
      <VideoSvg width="50%" />
      <EntranceButton />
    </SRoot>
  );
};

export default Entrance;
