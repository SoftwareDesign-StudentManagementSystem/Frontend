import styled from "styled-components";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface CardProps {
  cardtitle: string;
  headerChildren?: ReactNode; // 카드 헤더에 들어갈 내용
  contentChildren?: ReactNode; // 카드 콘텐츠 영역에 들어갈 내용
}

const Card = ({ cardtitle, headerChildren, contentChildren }: CardProps) => {
  // const isSearchCard = cardtitle === "학생 리스트 검색";
  const location = useLocation();
  const isHome = location.pathname === "/home"; //home에서의 카드 높이를 다르게 함.

  return (
    <CardWrapper noMinHeight={isHome}>
      <CardHeaderWrapper>
        <div>{cardtitle}</div>
        {headerChildren} {/* 헤더 영역에 children을 추가 */}
      </CardHeaderWrapper>
      <CardContentWrapper>{contentChildren}</CardContentWrapper>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div<{ noMinHeight?: boolean }>`
  width: 100%;
  height: fit-content;
  ${({ noMinHeight }) => !noMinHeight && `min-height: 250px;`}
  box-sizing: border-box;
  border-width: 0px 1px 1px 0px;
  border-style: solid;
  border-color: #e2e0db;
  border-radius: 8px;
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 8px;

  width: 100%;
  height: fit-content;

  background: #f1f2f8;
  border-radius: 8px 8px 0px 0px;
  box-sizing: border-box;

  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 125%;

  color: #333333;
`;

const CardContentWrapper = styled.div`
  width: 100%;
  height: fit-content;
  //min-height: 100px;

  //box-sizing: border-box;
`;
