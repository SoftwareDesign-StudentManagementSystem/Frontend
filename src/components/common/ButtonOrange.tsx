import styled from "styled-components";

const ButtonOrange = ({ text }: { text: string }) => {
  return <ButtonOrangeWrapper>{text}</ButtonOrangeWrapper>;
};

export default ButtonOrange;

const ButtonOrangeWrapper = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;

  width: 140px;
  height: 48px;

  background: #ffb608;
  border-radius: 6px;
`;
