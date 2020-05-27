import React from "react";
import { useHistory } from "react-router-dom";

const EntranceButton = () => {
  const history = useHistory();

  function handleCreateRoomClick() {
    history.push("/room/new");
  }

  return <button onClick={handleCreateRoomClick}>Create new room</button>;
};

export default EntranceButton;
