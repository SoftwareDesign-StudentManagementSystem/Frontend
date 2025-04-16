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
  padding: 8px 15px; /* 패딩을 줄여서 버튼 폭을 더 작게 */
  gap: 8px; /* 아이콘과 텍스트 사이의 간격도 줄임 */

  width: auto; /* 너비를 자동으로 설정 */
  height: 40px; /* 높이는 고정, 필요에 따라 조정 */

  background: #ffb608;
  border-radius: 6px;

  font-style: normal;
  font-weight: 600;
  font-size: 14px; /* 모바일에서 기본 폰트 크기 설정 */
  line-height: 150%;
  color: #ffffff;
  border: none;

  /* 모바일에서 글씨 크기 조절 */
  @media (max-width: 480px) {
    font-size: 12px; /* 모바일에서는 폰트 크기 더 작게 설정 */
  }

  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  text-align: center;
`;
