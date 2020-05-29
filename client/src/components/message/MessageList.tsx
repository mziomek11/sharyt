import React, { useEffect, useState, useRef } from "react";

import Message from "./Message";
import styled from "../../styles";
import { useRoom } from "../../context/room";

type ResponseMessage = {
  id: string;
  author: string;
  content: string;
};

const SList = styled.ul`
  list-style: none;
  height: 100%;
  padding: 1em;
  overflow: auto;
`;

const MessageList = () => {
  const { socket } = useRoom();
  const [messages, setMessages] = useState<ResponseMessage[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", onMessage);
    }
  }, [socket]);

  function onMessage(message: ResponseMessage) {
    setMessages((prevMessages) => [...prevMessages, message]);
    if (listRef.current) {
      listRef.current.scroll({ top: listRef.current.scrollHeight });
    }
  }

  return (
    <SList ref={listRef}>
      {messages.map(({ id, ...rest }) => (
        <Message key={id} {...rest} />
      ))}
    </SList>
  );
};

export default MessageList;
