import styled from "styled-components";
import { getStudentGrade } from "../../apis/grade.ts";
import { useEffect, useState } from "react";
import { Grade, GradeListProps, SubjectGrade } from "../../types/grades.ts";

const GradeList = ({ studentId, year, semester, miniView }: GradeListProps) => {
  const [grades, setGrades] = useState<Grade[]>([]);

  useEffect(() => {
    console.log(year, semester, studentId);
    getStudentGrade(year, semester, studentId)
      .then((res) => {
        console.log(res);
        setGrades(res);
        console.log("데이터 갱신을 성공하였습니다!");
      })
      .catch(() => {
        console.log("데이터를 불러오는 중 실패하였습니다!");
      });
  }, [year, semester, studentId]); // 의존성 배열 수정 (권장)

  return (
    <GradeListWrapper>
      <table>
        <thead>
          <tr>
            <th>과목명</th>
            <th>원점수/과목 평균</th>
            <th>성취도 (수강자 수)</th>
            <th>석차 등급</th>
          </tr>
        </thead>
        <tbody>
          {(miniView
            ? Object.entries(grades ?? {})
                .filter(
                  ([key]) =>
                    key !== "id" &&
                    key !== "studentId" &&
                    key !== "profileImageUrl" &&
                    key !== "year" &&
                    key !== "semester",
                )
                .slice(0, 3)
            : Object.entries(grades ?? {}).filter(
                ([key]) =>
                  key !== "id" &&
                  key !== "studentId" &&
                  key !== "profileImageUrl" &&
                  key !== "year" &&
                  key !== "semester",
              )
          ).map(([subject, grade]) => {
            const subjectGrade = grade as unknown as SubjectGrade;
            return (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{subjectGrade.score}</td>
                <td>{subjectGrade.achievementLevel}</td>
                <td>{subjectGrade.relativeRankGrade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </GradeListWrapper>
  );
};

export default GradeList;

const GradeListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #f1f2f8;
    padding: 10px;
    text-align: center;
  }

  .content {
    text-align: left;
  }

  th {
    font-weight: bold;
    text-align: center;
  }
`;
