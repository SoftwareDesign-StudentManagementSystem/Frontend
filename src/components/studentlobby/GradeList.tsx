import styled from "styled-components";
import { getStudentGrade, getStudentMyGrade } from "../../apis/grade.ts";
import { useEffect, useState } from "react";
import { Grade, GradeListProps, SubjectGrade } from "../../types/grades.ts";
import useUserStore from "../../stores/useUserStore.ts";
import { useLoading } from "../../stores/LoadingProvider.tsx";

// props 타입에 showInputRow, setShowInputRow 추가
interface GradeListExtendedProps extends GradeListProps {
  showInputRow?: boolean;
  setShowInputRow?: (v: boolean) => void;
}

const GradeList = ({
  studentId,
  year,
  semester,
  miniView,
  showInputRow,
  setShowInputRow,
}: GradeListExtendedProps) => {
  const { userInfo } = useUserStore();
  const { showLoading, hideLoading } = useLoading();

  const [grades, setGrades] = useState<Grade[]>([]);
  const [newGrade, setNewGrade] = useState({
    subject: "",
    score: "",
    achievementLevel: "",
    relativeRankGrade: "",
  });

  useEffect(() => {
    if (!userInfo.id) return;

    const fetchGrades = async () => {
      try {
        showLoading();
        if (userInfo.role === "ROLE_STUDENT") {
          const res = await getStudentMyGrade(year, semester);
          setGrades(res);
        } else {
          const res = await getStudentGrade(year, semester, studentId);
          setGrades(res);
        }
      } catch (error) {
        console.log("데이터를 불러오는 중 실패하였습니다!", error);
      } finally {
        hideLoading();
      }
    };

    fetchGrades();
  }, [year, semester, studentId, userInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGrade({ ...newGrade, [e.target.name]: e.target.value });
  };

  const handleAddGrade = () => {
    if (!newGrade.score.trim()) return;

    setGrades((prev) => ({
      ...prev,
      [newGrade.subject]: {
        score: newGrade.score,
        achievementLevel: newGrade.achievementLevel,
        relativeRankGrade: newGrade.relativeRankGrade,
      },
    }));

    setNewGrade({
      subject: "",
      score: "",
      achievementLevel: "",
      relativeRankGrade: "",
    });

    if (setShowInputRow) setShowInputRow(false);
  };

  // 유효한 과목 리스트만 필터링
  const validGradeEntries = Object.entries(grades ?? {}).filter(
    ([key]) =>
      ![
        "id",
        "studentId",
        "profileImageUrl",
        "year",
        "semester",
        "gradeRank",
      ].includes(key),
  );

  // miniView가 true면 상위 3개만 보여줌
  const displayedGrades = miniView
    ? validGradeEntries.slice(0, 3)
    : validGradeEntries;

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
          {displayedGrades.length === 0 ? (
            <tr>
              <td colSpan={4} className="nodata">
                성적 정보가 없습니다.
              </td>
            </tr>
          ) : (
            displayedGrades.map(([subject, grade]) => {
              const subjectGrade = grade as unknown as SubjectGrade;
              return (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td>
                    {subjectGrade.score} / {subjectGrade.average}
                  </td>
                  <td>{subjectGrade.achievementLevel}</td>
                  <td>{subjectGrade.relativeRankGrade}</td>
                </tr>
              );
            })
          )}

          {!miniView && showInputRow && (
            <tr>
              <td colSpan={4}>
                <StyledInput
                  type="text"
                  name="score"
                  value={newGrade.score}
                  onChange={handleInputChange}
                  placeholder="점수"
                />
                <button onClick={handleAddGrade} style={{ marginLeft: "10px" }}>
                  저장
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </GradeListWrapper>
  );
};

export default GradeList;

const GradeListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

  button {
    width: fit-content;
  }

  .nodata {
    text-align: center;
    padding: 20px 0;
    color: #888;
    font-size: 15px;
    background-color: #f8f8f8;
  }
`;

// 중간에 추가
const StyledInput = styled.input`
  width: 80%;
  padding: 8px 10px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #3d5afe;
    box-shadow: 0 0 0 2px rgba(61, 90, 254, 0.1);
  }

  &::placeholder {
    color: #b0b0b0;
  }
`;
