import React, { useState } from "react";

import styled from "../../styles";
import { useRoom } from "../../context/room";

const SInput = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.chatPadding};
  border: 0;
  border-top: 1px solid black;
  font-size: 1em;
`;

const MessageInput = () => {
  const { socket, userId } = useRoom();
  const [message, setMessage] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.trim().length === 0 || !socket) return;

    socket.emit("sendMessage", { userId, content: message });
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <SInput
        placeholder="Your message..."
        onChange={handleChange}
        value={message}
        disabled={!Boolean(socket)}
      />
    </form>
  );
};

export default MessageInput;
