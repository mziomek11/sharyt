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
  border-radius: 0.4em;
  margin-top: 0.3em;
  padding: 0.3em;
  color: ${(props) => (props.isAuthor ? props.theme.secondaryColor : "black")};
  background: ${(props) =>
    props.isAuthor ? props.theme.primaryColor : "lightgrey"};
`;

const STime = styled.time`
  margin-top: 0.3em;
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
      {showSendTime && <STime>{formatToHoursAndMinutes(sendTime)}</STime>}
    </SRoot>
  );
};

export default Message;
