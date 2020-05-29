import React from "react";

import styled from "../../styles";

type Props = {
  author: string;
  content: string;
  sendTime: number;
};

const SRoot = styled.li``;

const Message: React.FC<Props> = ({ author, content, sendTime }) => {
  const date = new Date(sendTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <SRoot>
      <p>
        {author} at {hours}:{minutes}
      </p>
      <p>{content}</p>
    </SRoot>
  );
};

export default Message;
