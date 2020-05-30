import React from "react";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styled from "../../styles";

const SRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;
  border: 1px solid black;
  margin-left: 1em;
  font-size: 0.9em;
`;

const SHeader = styled.h2`
  padding: 0.4em;
`;

const MessageBox = () => {
  return (
    <SRoot>
      <SHeader>Chat</SHeader>
      <MessageList />
      <MessageInput />
    </SRoot>
  );
};

export default MessageBox;
