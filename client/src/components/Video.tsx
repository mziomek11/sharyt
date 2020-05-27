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
    socket.on("startWatching", onStartWatching);
  }, [socket]);

  function onPlayVideo(time: number) {
    const state: PlayerState = player.current!.getPlayerState() as number;
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

  function onStartWatching() {
    const state: PlayerState = player.current!.getPlayerState() as number;
    if (state !== PlayerState.UNSTATED) {
      player.current!.seekTo(0, true);
      player.current!.playVideo();
    }
  }

  function handlePlayerReady(e: { target: YT.Player }) {
    player.current = e.target;
  }

  function handleStateChange(e: { target: YT.Player; data: PlayerState }) {
    const time = player.current!.getCurrentTime();
    const eventData = { roomId, time };

    switch (e.data) {
      case PlayerState.UNSTATED:
        socket.emit("startWatching", roomId);
        break;
      case PlayerState.PLAYING:
        socket.emit("playVideo", eventData);
        break;
      case PlayerState.PAUSED:
        socket.emit("pauseVideo", eventData);
        break;
    }
  }

  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: playerWidth.toString(),
        height: playerHeight.toString(),
        playerVars: { autoplay: 0, rel: 0, iv_load_policy: 3 },
      }}
      onReady={handlePlayerReady}
      onStateChange={handleStateChange}
    />
  );
};

export default Video;
