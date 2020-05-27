import React, { useState, useEffect } from "react";

type Props = {
  roomId: string;
  socket: SocketIOClient.Socket;
};

const VideoChanger: React.FC<Props> = ({ roomId, socket }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string>("");

  useEffect(() => {
    socket.on("changeVideo", onChangeVideo);
  }, [socket]);

  function onChangeVideo() {
    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (videoURL.trim().length === 0) return;

    const videoId = videoURL.replace("https://www.youtube.com/watch?v=", "");
    setLoading(true);
    socket.emit("changeVideo", { roomId, videoId });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVideoURL(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Video link here"
        onChange={handleChange}
        value={videoURL}
        disabled={loading}
      />
    </form>
  );
};

export default VideoChanger;
