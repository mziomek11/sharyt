import React from "react";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styled from "../../styles";

const margin = "1em";

const SRoot = styled.section`
  display: flex;
  flex-direction: column;
  font-size: 0.95em;
  height: 240px;
  width: 100%;
  box-shadow: ${(props) => props.theme.shadow.default};
  margin: ${margin} 0;
  border: 1px solid lightgrey;

  ${(props) => props.theme.media.tablet} {
    height: 340px;
    width: 340px;
    margin: 0;
    margin-left: ${margin};
  }
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
