import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

enum PlayerState {
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

type Props = {
  videoId: string;
  socket: SocketIOClient.Socket;
  roomId: string;
};

export const playerWidth = 640;
export const playerHeight = 480;

const Video: React.FC<Props> = ({ videoId, socket, roomId }) => {
  const player = useRef<YT.Player>();

  useEffect(() => {
    socket.on("playVideo", onPlayVideo);
    socket.on("pauseVideo", onPauseVideo);
  }, [socket]);

  function onReady(e: { target: YT.Player }) {
    player.current = e.target;
  }

  function handleStateChange(e: { target: YT.Player; data: PlayerState }) {
    switch (e.data) {
      case PlayerState.PLAYING:
        socket.emit("playVideo", roomId);
        break;
      case PlayerState.PAUSED:
        socket.emit("pauseVideo", roomId);
        break;
    }
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
      onStateChange={handleStateChange}
    />
  );
};

export default Video;
