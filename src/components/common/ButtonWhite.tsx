import styled from "styled-components";

const ButtonWhite = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return <ButtonWhiteWrapper onClick={onClick}>{text}</ButtonWhiteWrapper>;
};

export default ButtonWhite;

const ButtonWhiteWrapper = styled.button`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 15px;
  gap: 6px;

  width: auto;
  height: 40px;

  border: 0.5px solid #333333;
  border-radius: 6px;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #333333;
  background-color: transparent;

  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0; /* 연한 회색 배경 */
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }

  white-space: nowrap;
  text-align: center;
`;
