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
  padding: 8px 15px; /* 패딩 줄여서 버튼 폭을 더 적게 */
  gap: 6px; /* 아이콘과 텍스트 사이의 간격 줄임 */

  width: auto; /* 너비를 자동으로 설정 */
  height: 40px; /* 높이는 고정 */

  border: 0.5px solid #333333;
  border-radius: 6px;

  font-style: normal;
  font-weight: 600;
  font-size: 14px; /* 기본 폰트 크기 줄임 */
  line-height: 150%;
  color: #333333;
  background-color: transparent;

  /* 모바일에서 글씨 크기 줄이기 */
  @media (max-width: 480px) {
    font-size: 12px; /* 모바일에서는 폰트 크기 더 작게 */
  }

  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  text-align: center;
`;
