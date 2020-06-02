import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import styled from "../styles";
import { ReactComponent as ErrorSVG } from "../assets/error.svg";

type Props = {
  show: boolean;
  text: string;
  timeToAutoHide: number;
  onClose: () => void;
};

const SRoot = styled.div<{ show: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light};
  box-shadow: ${(props) => props.theme.shadow.default};
  padding: 0.4em 0.9em;
  transition: ${(props) => props.theme.transition.default};
  opacity: ${(props) => (props.show ? 1 : 0)};
  cursor: ${(props) => (props.show ? "pointer" : "default")};

  left: 0;
  right: 0;
  transform: translate(0);
  bottom: ${(props) => (props.show ? "0" : "-10%")};

  ${(props) => props.theme.media.tablet} {
    left: 50%;
    right: auto;
    transform: translate(-50%);
    bottom: ${(props) => (props.show ? "5px" : "-10%")};
  }
`;

const SText = styled.div`
  margin-left: 0.4em;
  font-weight: 500;
`;

const ErrorAlert: React.FC<Props> = ({
  text,
  onClose,
  timeToAutoHide,
  show,
}) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (show) timeoutRef.current = setTimeout(onClose, timeToAutoHide);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [show, timeToAutoHide, onClose]);

  function handleClick() {
    if (show) onClose();
  }

  const comp = (
    <SRoot show={show} onClick={handleClick}>
      <ErrorSVG />
      <SText>{text}</SText>
    </SRoot>
  );

  return createPortal(comp, document.querySelector("#root")!);
};

export default ErrorAlert;
