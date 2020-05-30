import React from "react";

import styled from "../../styles";
import Video from "../video/Video";
import VideoChanger from "../video/VideoChanger";
import { useRoom } from "../../context/room";

const SRoot = styled.section`
  width: 100%;
`;

const SVideoContainer = styled.div`
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 56.25%;
`;

const VideoSection = () => {
  const { socket } = useRoom();

  return (
    <SRoot>
      <SVideoContainer>{socket && <Video />}</SVideoContainer>
      <VideoChanger />
    </SRoot>
  );
};

export default VideoSection;
