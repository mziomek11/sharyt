import React from "react";

import styled from "../styles";
import VideoSection from "./video/VideoSection";
import MessageBox from "./message/MessageBox";
import { RoomProvider } from "../context/room";

const SRoot = styled.main`
  display: flex;
  flex-direction: column;

  ${(props) => props.theme.media.tablet} {
    flex-direction: row;
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
