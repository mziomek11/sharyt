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

    setLoading(true);
    const videoId = videoURL.replace("https://www.youtube.com/watch?v=", "");

    //source https://gist.github.com/tonY1883/a3b85925081688de569b779b4657439b
    var img = new Image();
    img.src = "http://img.youtube.com/vi/" + videoId + "/0.jpg";
    img.onload = () => {
      if (img.width === 120) alert("video does not exitst");
      else socket.emit("changeVideo", { roomId, videoId });
      setLoading(false);
    };
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
