import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams, useHistory } from "react-router-dom";

import Video from "./Video";

type Params = { roomId: string };
type State = {
  socket: null | SocketIOClient.Socket;
  videoId: null | string;
};

const initState: State = {
  socket: null,
  videoId: null,
};

const Room = () => {
  const history = useHistory();
  const params = useParams<Params>();
  const [state, setState] = useState<State>(initState);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER!);
    const joinRoomData = { roomId: params.roomId, username: "some username" };
    socket.emit("joinRoom", joinRoomData, (room: any) => {
      if (room) {
        setState({ socket, videoId: room.videoId });
        history.push("/room/" + room.id);
      } else history.push("/");
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <main>
      <h2>Room</h2>
      <Video
        videoId={state.videoId}
        socket={state.socket}
        room={params.roomId}
      />
    </main>
  );
};

export default Room;
