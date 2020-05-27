import React, { useState } from "react";

type Props = {
  roomId: string;
  socket: SocketIOClient.Socket | null;
};

const VideoChanger: React.FC<Props> = ({ roomId, socket }) => {
  const [videoURL, setVideoURL] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVideoURL(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const videoId = videoURL.replace("https://www.youtube.com/watch?v=", "");
    if (socket) socket.emit("changeVideo", { roomId, videoId });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Video link here"
        onChange={handleChange}
        value={videoURL}
        disabled={!Boolean(socket)}
      />
    </form>
  );
};

export default VideoChanger;
