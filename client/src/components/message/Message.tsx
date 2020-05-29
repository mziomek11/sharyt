import React from "react";

import styled from "../../styles";

type Props = {
  author: string;
  content: string;
};

const SRoot = styled.li``;

const Message: React.FC<Props> = ({ author, content }) => {
  return (
    <SRoot>
      {author}:{content}
    </SRoot>
  );
};

export default Message;
