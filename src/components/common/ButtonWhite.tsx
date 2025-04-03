import styled from "styled-components";

const ButtonWhite = ({ text }: { text: string }) => {
  return <ButtonWhiteWrapper>{text}</ButtonWhiteWrapper>;
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

  border: 1px solid #333333;
  border-radius: 6px;
`;
