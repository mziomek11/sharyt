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

type StyledProps = { isAuthor: boolean };

const SRoot = styled.li<StyledProps>`
  align-self: ${(props) => (props.isAuthor ? "flex-end" : "flex-start")};
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isAuthor ? "flex-end" : "flex-start")};
  margin-top: 0.5rem;

  &:first-child {
    margin-top: 0;
  }
`;

const SAuthor = styled.span`
  font-weight: 500;
  margin-bottom: 0.1em;
`;

const SGroupMessageList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const MessageGroup: React.FC<MessageGroupType> = ({ author, messages }) => {
  const { username } = useRoom();
  const isAuthor = username === author;

  return (
    <SRoot isAuthor={isAuthor}>
      <SAuthor>{author === "System" ? author : `User ${author}`}</SAuthor>
      <SGroupMessageList>
        {messages.map(({ content, id, sendTime, showSendTime }) => (
          <Message
            key={id}
            content={content}
            isAuthor={isAuthor}
            sendTime={sendTime}
            showSendTime={showSendTime}
          />
        ))}
      </SGroupMessageList>
    </SRoot>
  );
};

export default MessageGroup;
