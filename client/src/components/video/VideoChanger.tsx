import React, { useState } from "react";

import styled from "../../styles";
import { useRoom } from "../../context/room";

const SForm = styled.form`
  margin-top: 1em;
  box-shadow: ${(props) => props.theme.shadow.default};
`;

const SInput = styled.input`
  width: 100%;
  padding: 0.4em 0.6em;
  font-size: 1.1em;
  border: 1px solid lightgrey;
`;

const VideoChanger = () => {
  const { roomId, socket } = useRoom();
  const [loading, setLoading] = useState<boolean>(false);
  const [videoURL, setVideoURL] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (videoURL.trim().length === 0 || !socket) return;

    setLoading(true);
    const videoId = videoURL.replace("https://www.youtube.com/watch?v=", "");

    //source https://gist.github.com/tonY1883/a3b85925081688de569b779b4657439b
    const videoImage = new Image();
    videoImage.src = "http://img.youtube.com/vi/" + videoId + "/0.jpg";
    videoImage.onload = () => {
      if (videoImage.width === 120) alert("video does not exitst");
      else {
        socket.emit("changeVideo", { roomId, videoId });
        setVideoURL("");
      }
      setLoading(false);
    };
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVideoURL(e.target.value);
  }

  return (
    <SForm onSubmit={handleSubmit}>
      <SInput
        placeholder="Paste here youtube link"
        onChange={handleChange}
        value={videoURL}
        disabled={!Boolean(socket) || loading}
      />
    </SForm>
  );
};

export default VideoChanger;
