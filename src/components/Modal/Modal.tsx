import styled from "styled-components";

import { ModalProps } from "../../types/modal.ts";
const Modal = ({ title, content, onClose }: ModalProps) => {
  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>{title}</div>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </ModalHeader>
        <ContentWrapper>{content}</ContentWrapper>
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal;

// 모달 배경 (오버레이)
const Overlay = styled.div`
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
`;

const ModalWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  max-height: 85%;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: column; /* flex column 구조로 변경 */

  @media (max-width: 768px) {
    width: 100%;
    max-height: 85%;
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
