import { useEffect, useState } from "react";
import styled from "styled-components";
import { ModalProps } from "../../types/modal.ts";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root") || document.body;

const Modal = ({ title, content, onClose }: ModalProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 모달 열릴 때 애니메이션 적용
    setVisible(true);
    return () => setVisible(false);
  }, []);

  const handleClose = () => {
    setVisible(false);
    // 애니메이션 끝난 후 실제로 닫기
    setTimeout(onClose, 300); // duration과 동일
  };

  return createPortal(
    <Overlay $visible={visible} onClick={handleClose}>
      <ModalWrapper $visible={visible} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>{title}</div>
          <CloseButton onClick={handleClose}>✖</CloseButton>
        </ModalHeader>
        <ContentWrapper>{content}</ContentWrapper>
      </ModalWrapper>
    </Overlay>,
    modalRoot,
  );
};

export default Modal;

// 모달 배경 (오버레이)
const Overlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ModalWrapper = styled.div<{ $visible: boolean }>`
  width: fit-content;
  max-height: 85%;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(20px)"};

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    padding: 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;

  flex-grow: 1; /* 남는 공간 채우기 */
  overflow-y: auto; /* 여기만 스크롤 생기게 */
`;

// 모달 헤더 (제목 + 닫기 버튼)
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  div {
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 150%;
    /* identical to box height, or 45px */
    text-transform: capitalize;

    color: #000000;
  }
`;

// 닫기 버튼
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
