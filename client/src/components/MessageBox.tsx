import React, { useEffect, useState } from "react";

type Message = {
  id: string;
  author: string;
  content: string;
};

type Props = {
  socket: SocketIOClient.Socket;
};

const MessageBox: React.FC<Props> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", onMessage);
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

export default MessageBox;
