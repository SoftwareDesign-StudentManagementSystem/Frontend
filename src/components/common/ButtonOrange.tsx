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
  padding: 12px 20px;
  gap: 10px;

  width: 140px;
  height: 48px;

  background: #ffb608;
  border-radius: 6px;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  /* identical to box height, or 24px */
  text-transform: capitalize;

  color: #ffffff;
  border: none;
`;
