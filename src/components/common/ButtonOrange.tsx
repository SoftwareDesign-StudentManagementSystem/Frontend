import styled from "styled-components";

const ButtonOrange = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return <ButtonOrangeWrapper onClick={onClick}>{text}</ButtonOrangeWrapper>;
};

export default ButtonOrange;
const ButtonOrangeWrapper = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 15px;
  gap: 8px;

  width: auto;
  height: 40px;

  background: #ffb608;
  border-radius: 6px;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #ffffff;
  border: none;

  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0a200; /* 좀 더 진한 오렌지 */
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }

  white-space: nowrap;
  text-align: center;
`;
