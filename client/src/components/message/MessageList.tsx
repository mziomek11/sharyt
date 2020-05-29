import React, { useEffect, useState } from "react";

import { useRoom } from "../../context/room";

type Message = {
  id: string;
  author: string;
  content: string;
};

const MessageList = () => {
  const { socket } = useRoom();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on("message", onMessage);
    }
  }, [socket]);

  function onMessage(message: Message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  return (
    <div>
      {messages.map(({ id, author, content }) => (
        <div key={id}>
          {author}: {content}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
