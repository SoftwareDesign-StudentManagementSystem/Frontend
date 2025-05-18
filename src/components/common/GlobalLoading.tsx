import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";
import { useLoading } from "../../stores/LoadingProvider";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Spinner = styled.div`
  border: 6px solid #ddd;
  border-top: 6px solid #ffb608;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const GlobalLoading = () => {
  const { isLoading } = useLoading();
  if (!isLoading) return null;
  return createPortal(
    <Overlay>
      <Spinner />
    </Overlay>,
    document.body,
  );
};

export default GlobalLoading;
