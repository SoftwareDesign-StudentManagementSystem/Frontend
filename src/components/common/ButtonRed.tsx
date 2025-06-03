import styled from "styled-components";

const ButtonRed = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return <ButtonRedWrapper onClick={onClick}>{text}</ButtonRedWrapper>;
};

export default ButtonRed;

const ButtonRedWrapper = styled.button`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 15px;
  gap: 6px;

  width: auto;
  height: 40px;

  border: 0.5px solid #e74c3c; /* 붉은 테두리 */
  border-radius: 6px;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #e74c3c; /* 붉은 글씨 */
  background-color: transparent;

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: #e74c3c;
    color: white; /* hover 시 색 반전 */
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }

  white-space: nowrap;
  text-align: center;
`;
