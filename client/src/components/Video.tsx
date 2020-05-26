import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import io from "socket.io-client";

type Props = {
  videoId: string;
};

const options = {
  height: "480",
  width: "640",
};

const Video: React.FC<Props> = ({ videoId }) => {
  const [player, setPlayer] = useState<null | YT.Player>(null);

  useEffect(() => {
    io("localhost:8080");
  }, []);

  function onReady(e: { target: YT.Player }) {
    setPlayer(e.target);
  }

  function startPlaying() {
    if (player) {
      player.playVideo();
    }
  }

  function stopPlaying() {
    if (player) {
      player.pauseVideo();
    }
  }

  return (
    <div>
      <YouTube videoId={videoId} opts={options} onReady={onReady} />
      <button onClick={startPlaying} disabled={!player}>
        Play
      </button>
      <button onClick={stopPlaying} disabled={!player}>
        Stop
      </button>
    </div>
  );
};

export default Video;
