import React from "react";

import Message from "./Message";
import styled from "../../styles";
import { useRoom } from "../../context/room";

export type MessageGroupType = {
  author: string;
  messages: Array<{
    id: string;
    content: string;
    sendTime: number;
    showSendTime: boolean;
  }>;
};

type SRootProps = { isAuthor: boolean };

const SRoot = styled.li<SRootProps>`
  padding: 0.4em;
  align-self: ${(props) => (props.isAuthor ? "flex-end" : "flex-start")};
  text-align: ${(props) => (props.isAuthor ? "right" : "left")};
`;

const SAuthor = styled.span`
  font-weight: 500;
`;

const MessageGroup: React.FC<MessageGroupType> = ({ author, messages }) => {
  const { username } = useRoom();
  const isAuthor = username === author;

  return (
    <SRoot isAuthor={isAuthor}>
      <SAuthor>{author}</SAuthor>
      <ul>
        {messages.map(({ content, id, sendTime, showSendTime }) => (
          <Message
            key={id}
            content={content}
            isAuthor={isAuthor}
            sendTime={sendTime}
            showSendTime={showSendTime}
          />
        ))}
      </ul>
    </SRoot>
  );
};

export default MessageGroup;
