import React, { useState, useEffect, useContext, createContext } from "react";
import io from "socket.io-client";
import { useParams, useHistory } from "react-router-dom";

type Params = { roomId: string };
type ResponseRoom = { id: string; videoId: string };
type ResponseUser = { id: string; username: string };
type RoomContext = {
  userId: string;
  username: string;
  roomId: string;
  videoId: string;
  socket: SocketIOClient.Socket | null;
};

export const RoomContext = createContext<RoomContext>({} as any);

export const RoomProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const { roomId } = useParams<Params>();
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [state, setState] = useState<Omit<RoomContext, "socket" | "roomId">>({
    userId: "",
    username: "",
    videoId: "",
  });

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER!);
    const joinRoomCallback = (room?: ResponseRoom, user?: ResponseUser) => {
      if (room && user) {
        console.log(user);
        setState({
          userId: user.id,
          username: user.username,
          videoId: room.videoId,
        });
        setSocket(socket);

        socket.on("changeVideo", onChangeVideo);
        history.replace("/room/" + room.id);
      } else history.replace("/");
    };

    socket.emit("joinRoom", roomId, joinRoomCallback);

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  function onChangeVideo(videoId: string) {
    setState((prevState) => ({ ...prevState, videoId }));
  }

  return (
    <RoomContext.Provider value={{ roomId, socket, ...state }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);
