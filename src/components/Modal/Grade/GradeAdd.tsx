import styled from "styled-components";
import Card from "../../common/Card.tsx";
import GradeList from "../../studentlobby/GradeList.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { GradeListProps } from "../../../types/grades.ts";

const GradeAdd = ({ year, semester, studentId }: GradeListProps) => {
  return (
    <GradeAddWrapper>
      <Card
        cardtitle={year + "학년 " + semester + "학기"}
        contentChildren={
          <GradeList
            year={year}
            semester={semester}
            studentId={studentId}
            miniView={false}
          />
        }
      />
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
