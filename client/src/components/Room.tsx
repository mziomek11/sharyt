import React from "react";

import styled from "../styles";
import Video, { playerHeight, playerWidth } from "./video/Video";
import VideoLoader from "./video/VideoLoader";
import VideoChanger from "./video/VideoChanger";
import MessageBox from "./message/MessageBox";
import { RoomProvider, useRoom } from "../context/room";

const VideoContainer = styled.div`
  width: ${playerWidth}px;
  height: ${playerHeight}px;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Room = () => {
  const { socket } = useRoom();

  return (
    <main className="container">
      <VideoContainer>{socket ? <Video /> : <VideoLoader />}</VideoContainer>
      <VideoChanger />
      <MessageBox />
    </main>
  );
};

export default () => (
  <RoomProvider>
    <Room />
  </RoomProvider>
);
