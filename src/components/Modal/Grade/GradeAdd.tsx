import styled from "styled-components";
import { useState } from "react";
import Card from "../../common/Card.tsx";
import GradeList from "../../studentlobby/GradeList.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";

const GradeAdd = () => {
  return (
    <GradeAddWrapper>
      <Card cardtitle={"3학년 2학기"} contentChildren={<GradeList />} />
      <ButtonWhite text={"+ 성적 추가"} />
    </GradeAddWrapper>
  );
};

export default GradeAdd;

const GradeAddWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-transform: capitalize;
    color: #000000;
    //margin-bottom: 8px;
  }
`;
