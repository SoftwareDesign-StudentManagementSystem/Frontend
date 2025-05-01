import styled from "styled-components";
import Card from "../../common/Card.tsx";
import GradeList from "../../studentlobby/GradeList.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { Grade, GradeListProps } from "../../../types/grades.ts";
import { useEffect, useState } from "react";
import GradeRadarChart from "./GradeRadarChart.tsx";
import { getStudentGrade } from "../../../apis/grade.ts";

//각 학기별 성적을 보여주는 화면
const GradeSemesterView = ({ year, semester, studentId }: GradeListProps) => {
  const [showInputRow, setShowInputRow] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await getStudentGrade(year, semester, studentId);
        console.log("GradeSemesterView", res);
        setGrades(res);
      } catch (error) {
        console.error("성적 조회 중 오류 발생:", error);
      } finally {
        setLoading(false); // 요청 완료 후 로딩 false
      }
    };

    fetchGrades();
  }, [year, semester, studentId]);

  const handleClickAdd = () => {
    setShowInputRow(true);
  };

  return (
    <GradeAddWrapper>
      {/* 이 위치에 레이더차트 삽입 */}
      {!loading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RadarChartWrapper>
            <GradeRadarChart grades={grades} />
          </RadarChartWrapper>
        </div>
      )}

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

export default GradeSemesterView;

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
