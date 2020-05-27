import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

enum PlayerState {
  UNSTATED = -1,
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

  function handlePlayerReady(e: { target: YT.Player }) {
    player.current = e.target;
  }

  function handleStateChange(e: { target: YT.Player; data: PlayerState }) {
    const time = player.current!.getCurrentTime();
    const eventData = { roomId, time };

    switch (e.data) {
      case PlayerState.PLAYING:
        socket.emit("playVideo", eventData);
        break;
      case PlayerState.PAUSED:
        socket.emit("pauseVideo", eventData);
        break;
    }
  }

  function onPlayVideo(time: number) {
    const state: PlayerState = player.current!.getPlayerState() as number;
    console.log(state);
    if (state === PlayerState.UNSTATED || state === PlayerState.PAUSED) {
      player.current!.playVideo();
      player.current!.seekTo(time, true);
    }
  }

  function onPauseVideo(time: number) {
    const state: PlayerState = player.current!.getPlayerState() as number;
    if (state !== PlayerState.PAUSED) {
      player.current!.pauseVideo();
      player.current!.seekTo(time, true);
    }
  }

  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: playerWidth.toString(),
        height: playerHeight.toString(),
        playerVars: { autoplay: 1 },
      }}
      onReady={handlePlayerReady}
      onStateChange={handleStateChange}
    />
  );
};

export default Video;
