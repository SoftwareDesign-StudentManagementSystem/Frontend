import styled from "styled-components";
import Card from "../../common/Card.tsx";
import GradeList from "../../studentlobby/GradeList.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import { Grade, GradeListProps } from "../../../types/grades.ts";
import { useEffect, useState } from "react";
import GradeRadarChart from "./GradeRadarChart.tsx";
import { getStudentGrade, getStudentMyGrade } from "../../../apis/grade.ts";
import useUserStore from "../../../stores/useUserStore.ts";

// 각 학기별 성적을 보여주는 화면
const GradeSemesterView = ({ year, semester, studentId }: GradeListProps) => {
  const { userInfo } = useUserStore();

  const [showInputRow, setShowInputRow] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        if (userInfo.role === "ROLE_STUDENT") {
          const res = await getStudentMyGrade(year, semester);
          console.log("GradeSemesterView", res);
          setGrades(res);
        } else {
          const res = await getStudentGrade(year, semester, studentId);
          console.log("GradeSemesterView", res);
          setGrades(res);
        }
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

      <CardWrapper>
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
      </CardWrapper>
    </GradeAddWrapper>
  );
};

export default GradeSemesterView;

const GradeAddWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row-reverse; /* PC에서 레이아웃을 가로로 배치 */
    align-items: flex-start;
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RadarChartWrapper = styled.div`
  min-width: 300px;
  display: flex;
  //width: 100%;
  justify-content: center;

  @media (min-width: 768px) {
    //width: 30%; /* PC에서 레이더 차트를 40%로 크기 조정 */
    //margin-left: 20px; /* 카드와 차트 사이의 여백 */
  }
`;
