import React from "react";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styled from "../../styles";

const SRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 510px;
  width: 100%;
  border: 1px solid black;
  margin-left: 1em;
`;

const MessageBox = () => {
  return (
    <SRoot>
      <MessageList />
      <MessageInput />
    </SRoot>
  );
};

export default MessageBox;
