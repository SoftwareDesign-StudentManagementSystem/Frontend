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

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;

  margin: 0 auto;
  min-width: 140px;
  height: 48px;

  border: 0.5px solid #333333;
  border-radius: 6px;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */
  text-transform: capitalize;

  color: #333333;
  background-color: transparent;
`;
