import React, { useState } from "react";

import ErrorAlert from "../ErrorAlert";
import styled from "../../styles";
import { useRoom } from "../../context/room";

type State = {
  loading: boolean;
  videoURL: string;
  showErrorAlert: boolean;
};

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

const initState: State = {
  loading: false,
  videoURL: "",
  showErrorAlert: false,
};

const VideoChanger = () => {
  const { roomId, socket } = useRoom();
  const [state, setState] = useState(initState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.videoURL.trim().length === 0 || !socket || state.loading) return;

    setState({ ...state, loading: true });
    const youtubeURL = "https://www.youtube.com/watch?v=";
    const videoId = state.videoURL.replace(youtubeURL, "");

    //source https://gist.github.com/tonY1883/a3b85925081688de569b779b4657439b
    const videoImage = new Image();
    videoImage.src = "http://img.youtube.com/vi/" + videoId + "/0.jpg";
    videoImage.onload = () => {
      if (videoImage.width !== 120) {
        socket.emit("changeVideo", { roomId, videoId });
        setState({ ...initState });
      } else setState({ ...state, showErrorAlert: true, loading: false });
    };
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!state.loading) setState({ ...state, videoURL: e.target.value });
  }

  function handleAlertClose() {
    setState({ ...state, showErrorAlert: false });
  }

  return (
    <>
      <SForm onSubmit={handleSubmit}>
        <SInput
          placeholder="Paste here youtube link"
          onChange={handleChange}
          value={state.videoURL}
          disabled={!Boolean(socket)}
        />
      </SForm>

      <ErrorAlert
        show={state.showErrorAlert}
        onClose={handleAlertClose}
        text="Video not found"
        timeToAutoHide={1800}
      />
    </>
  );
};

export default VideoChanger;
