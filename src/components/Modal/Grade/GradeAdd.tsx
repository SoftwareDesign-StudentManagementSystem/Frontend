import styled from "styled-components";
import Card from "../../common/Card.tsx";
import GradeList from "../../studentlobby/GradeList.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { GradeListProps } from "../../../types/grades.ts";
import { useState } from "react";
import GradeRadarChart from "./GradeRadarChart.tsx";

const GradeAdd = ({ year, semester, studentId }: GradeListProps) => {
  const [showInputRow, setShowInputRow] = useState(false);

  const handleClickAdd = () => {
    setShowInputRow(true);
  };
  const dummyGrades = [88, 92, 76, 95, 83, 90]; // 예시 점수 (API로 대체 가능)

  return (
    <GradeAddWrapper>
      {/* 이 위치에 레이더차트 삽입 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RadarChartWrapper>
          <GradeRadarChart grades={dummyGrades} />
        </RadarChartWrapper>
      </div>

      <Card
        cardtitle={year + "학년 " + semester + "학기"}
        contentChildren={
          <GradeList
            year={year}
            semester={semester}
            studentId={studentId}
            miniView={false}
            showInputRow={showInputRow}
            setShowInputRow={setShowInputRow}
          />
        }
      />
      <ButtonWhite text={"+ 성적 추가"} onClick={handleClickAdd} />
    </GradeAddWrapper>
  );
};

export default GradeAdd;

const GradeAddWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RadarChartWrapper = styled.div`
  width: 40%;
  min-width: 300px;
  //height: 300px;
`;
