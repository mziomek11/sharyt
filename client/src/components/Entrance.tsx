import React from "react";
import { useHistory } from "react-router-dom";

const Entrance = () => {
  const history = useHistory();

  function handleCreateRoomClick() {
    history.push("/room/new");
  }

  return (
    <main>
      <button onClick={handleCreateRoomClick}>Create new room</button>
    </main>
  );
};

export default Entrance;
