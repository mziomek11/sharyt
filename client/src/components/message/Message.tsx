import React from "react";

import styled from "../../styles";
import { formatToHoursAndMinutes } from "../../utils/time";

type Props = {
  content: string;
  isAuthor: boolean;
  sendTime: number;
  showSendTime: boolean;
};

const SRoot = styled.li<{ isAuthor: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isAuthor ? "flex-end" : "flex-start")};
`;

const SMessage = styled.p<{ isAuthor: boolean }>`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  border-radius: 0.5em;
  margin-top: 0.2em;
  padding: 0.4em 0.45em;
  color: ${(props) =>
    props.isAuthor ? props.theme.colors.light : props.theme.colors.dark};
  background: ${(props) =>
    props.isAuthor ? props.theme.colors.primary : "lightgrey"};
`;

const timeMargin = "0.1em";
const STime = styled.time<{ isAuthor: boolean }>`
  margin-top: 0.2em;
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.6);
  margin-left: ${(props) => (props.isAuthor ? 0 : timeMargin)};
  margin-right: ${(props) => (props.isAuthor ? timeMargin : 0)};
`;

const Message: React.FC<Props> = ({
  content,
  isAuthor,
  sendTime,
  showSendTime,
}) => {
  return (
    <SRoot isAuthor={isAuthor}>
      <SMessage isAuthor={isAuthor}>{content}</SMessage>
      {showSendTime && (
        <STime isAuthor={isAuthor}>{formatToHoursAndMinutes(sendTime)}</STime>
      )}
    </SRoot>
  );
};

export default Message;
