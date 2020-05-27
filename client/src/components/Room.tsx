import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";

import Video, { playerHeight, playerWidth } from "./Video";
import VideoLoader from "./VideoLoader";

type Params = { roomId: string };

const VideoContainer = styled.div`
  width: ${playerWidth}px;
  height: ${playerHeight}px;
`;

const Room = () => {
  const history = useHistory();
  const params = useParams<Params>();
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [videoId, setVideoId] = useState<string>("");

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER!);
    const joinRoomData = { roomId: params.roomId, username: "some username" };
    const joinRoomCallback = (room?: any) => {
      if (room) {
        setVideoId(room.videoId);
        setSocket(socket);
        history.replace("/room/" + room.id);
      } else history.replace("/");
    };

    socket.emit("joinRoom", joinRoomData, joinRoomCallback);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main>
      <h2>Room</h2>
      <VideoContainer>
        {socket ? (
          <Video videoId={videoId} socket={socket} room={params.roomId} />
        ) : (
          <VideoLoader />
        )}
      </VideoContainer>
      <p>Some text</p>
    </main>
  );
};

export default Room;
