import styled from "styled-components";
import { ReactNode, useState } from "react";

interface CardProps {
  cardtitle: string;
  children?: ReactNode;
}

const Card = ({ cardtitle, children }: CardProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <CardWrapper>
      <CardHeaderWrapper>
        {cardtitle}
        <select
          id="dropdown"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">3학년 2학기</option>
          <option value="option1">3학년 1학기</option>
          <option value="option2">2학년 2학기</option>
          <option value="option3">2학년 1학기</option>
        </select>
      </CardHeaderWrapper>
      <CardContentWrapper>{children}</CardContentWrapper>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  width: 100%;
  height: fit-content;
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
  /* identical to box height, or 22px */

  color: #333333;

  select {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    color: #808080;

    border: none;
    width: 181px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px;
    padding: 4px;
  }
`;

const CardContentWrapper = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100px;

  padding: 12px 20px;
  box-sizing: border-box;
`;
