import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

type Props = {
  videoId: string;
  socket: SocketIOClient.Socket;
  room: string;
};

export const playerWidth = 640;
export const playerHeight = 480;

const Video: React.FC<Props> = ({ videoId, socket, room }) => {
  const player = useRef<YT.Player>();

  useEffect(() => {
    socket.on("playVideo", onPlayVideo);
    socket.on("pauseVideo", onPauseVideo);
  }, [socket]);

  function onReady(e: { target: YT.Player }) {
    player.current = e.target;
  }

  function handlePlayVideo() {
    socket.emit("playVideo", room);
  }

  function handlePauseVideo() {
    socket.emit("pauseVideo", room);
  }

  function onPlayVideo() {
    if (player.current) player.current.playVideo();
  }

  function onPauseVideo() {
    if (player.current) player.current.pauseVideo();
  }

  return (
    <YouTube
      videoId={videoId}
      opts={{ width: playerWidth.toString(), height: playerHeight.toString() }}
      onReady={onReady}
      onPlay={handlePlayVideo}
      onPause={handlePauseVideo}
    />
  );
};

export default Video;
