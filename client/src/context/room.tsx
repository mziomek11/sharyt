import React, { useState, useEffect, useContext, createContext } from "react";
import io from "socket.io-client";
import { useParams, useHistory } from "react-router-dom";

type Params = { roomId: string };
type ResponseRoom = { id: string; videoId: string };
type RoomContext = {
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
  const [videoId, setVideoId] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER!);
    const joinRoomCallback = (room?: ResponseRoom, username?: string) => {
      if (room && username) {
        setVideoId(room.videoId);
        setSocket(socket);
        setUsername(username);
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
    setVideoId(videoId);
  }

  return (
    <RoomContext.Provider value={{ roomId, socket, videoId, username }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);
