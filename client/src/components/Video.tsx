import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

type Props = {
  videoId: string | null;
  socket: SocketIOClient.Socket | null;
  room: string;
};

const options = {
  height: "480",
  width: "640",
};

const Video: React.FC<Props> = ({ videoId, socket, room }) => {
  const player = useRef<YT.Player>();

  useEffect(() => {
    if (socket) {
      socket.on("playVideo", onPlayVideo);
      socket.on("pauseVideo", onPauseVideo);
    }
  }, [socket]);

  function onReady(e: { target: YT.Player }) {
    player.current = e.target;
  }

  function handlePlayVideo() {
    if (socket) socket.emit("playVideo", room);
  }

  function handlePauseVideo() {
    if (socket) socket.emit("pauseVideo", room);
  }

  function onPlayVideo() {
    if (player.current) player.current.playVideo();
  }

  function onPauseVideo() {
    if (player.current) player.current.pauseVideo();
  }

  if (!socket || !videoId) return <h1>Loading</h1>;

  return (
    <YouTube
      videoId={videoId}
      opts={options}
      onReady={onReady}
      onPlay={handlePlayVideo}
      onPause={handlePauseVideo}
    />
  );
};

export default Video;
