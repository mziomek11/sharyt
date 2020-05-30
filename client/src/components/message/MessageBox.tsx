import React from "react";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styled from "../../styles";

const SRoot = styled.section`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  font-size: 0.9em;
  height: 240px;
  margin-bottom: 1em;

  ${(props) => props.theme.media.tablet} {
    height: auto;
    margin: 0;
  }
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
