import React, { useState } from "react";

import { useRoom } from "../../context/room";

const MessageInput = () => {
  const { socket, username } = useRoom();
  const [message, setMessage] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message.trim().length === 0 || !socket) return;

    socket.emit("message", { message, author: username });
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Your message..."
        onChange={handleChange}
        value={message}
        disabled={!Boolean(socket)}
      />
    </form>
  );
};

export default MessageInput;
