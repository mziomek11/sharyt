import React from "react";

import styled from "../styles";
import VideoSection from "./video/VideoSection";
import MessageBox from "./message/MessageBox";
import { RoomProvider } from "../context/room";

const SRoot = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1em;

  ${(props) => props.theme.media.tablet} {
    grid-template-columns: 1fr 200px;
    grid-auto-rows: 1fr;
  }
`;

const Room = () => {
  return (
    <RoomProvider>
      <SRoot className="container">
        <VideoSection />
        <MessageBox />
      </SRoot>
    </RoomProvider>
  );
};

export default Room;
