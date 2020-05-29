import React from "react";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styled from "../../styles";

const SRoot = styled.div`
  height: 500px;
  width: 400px;
  border: 1px solid black;
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
