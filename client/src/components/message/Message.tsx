import React from "react";

import styled from "../../styles";
import { formatToHoursAndMinutes } from "../../utils/time";

type Props = {
  content: string;
  isAuthor: boolean;
  sendTime: number;
  showSendTime: boolean;
};

const SMessage = styled.p<{ isAuthor: boolean }>`
  padding: 0.4em;
  background: ${(props) =>
    props.isAuthor ? props.theme.primaryColor : "lightgrey"};
`;

const STime = styled.time``;

const Message: React.FC<Props> = ({
  content,
  isAuthor,
  sendTime,
  showSendTime,
}) => {
  return (
    <li>
      <SMessage isAuthor={isAuthor}>{content}</SMessage>
      {showSendTime && <STime>{formatToHoursAndMinutes(sendTime)}</STime>}
    </li>
  );
};

export default Message;
