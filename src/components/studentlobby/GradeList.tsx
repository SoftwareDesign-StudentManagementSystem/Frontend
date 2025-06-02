import styled from "styled-components";
import {
  getStudentGrade,
  getStudentMyGrade,
  createStudentGrade,
  updateStudentGrade,
  deleteStudentGrade,
} from "../../apis/grade.ts";
import { useEffect, useState } from "react";
import { Grade, GradeListProps, SubjectGrade } from "../../types/grades.ts";
import useUserStore from "../../stores/useUserStore.ts";
import { useLoading } from "../../stores/LoadingProvider.tsx";

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

  const [grades, setGrades] = useState<Grade>();
  const [newScore, setNewScore] = useState("");

  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [editingScore, setEditingScore] = useState<string>("");

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

  const handleAddGrade = async () => {
    if (!newScore.trim()) return;

    try {
      showLoading();
      const semesterEnum =
        semester === 1 ? "FIRST_SEMESTER" : "SECOND_SEMESTER";

      console.log(year, semesterEnum, studentId, newScore);

      await createStudentGrade(studentId, {
        year,
        semester: semesterEnum,
        score: Number(newScore),
      });

      const updated = await getStudentGrade(year, semester, studentId);
      setGrades(updated);
    } catch (err) {
      console.error("등록 실패", err);
    } finally {
      hideLoading();
      setNewScore("");
      if (setShowInputRow) setShowInputRow(false);
    }
  };

  const handleDeleteGrade = async () => {
    try {
      showLoading();
      if (grades === undefined) return;

      await deleteStudentGrade(grades.id);
      const updated = await getStudentGrade(year, semester, studentId);
      setGrades(updated);
    } catch (err) {
      console.error("삭제 실패", err);
    } finally {
      hideLoading();
    }
  };

  const handleSaveEdit = async () => {
    try {
      showLoading();
      if (grades === undefined) return;
      await updateStudentGrade(grades.id, { score: Number(editingScore) });
      const updated = await getStudentGrade(year, semester, studentId);
      setGrades(updated);
      setEditingSubject(null);
    } catch (err) {
      console.error("수정 실패", err);
    } finally {
      hideLoading();
    }
  };

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
            {!miniView && <th>관리</th>}
          </tr>
        </thead>
        <tbody>
          {displayedGrades.length === 0 ? (
            <tr>
              <td colSpan={miniView ? 4 : 5} className="nodata">
                성적 정보가 없습니다.
              </td>
            </tr>
          ) : (
            displayedGrades.map(([subject, grade], index) => {
              const subjectGrade = grade as unknown as SubjectGrade;
              const isEditing = editingSubject === index.toString();

              return (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td>
                    {isEditing ? (
                      <StyledInput
                        name="editingScore"
                        value={editingScore}
                        onChange={(e) => setEditingScore(e.target.value)}
                      />
                    ) : (
                      `${subjectGrade.score} / ${subjectGrade.average}`
                    )}
                  </td>
                  <td>{subjectGrade.achievementLevel}</td>
                  <td>{subjectGrade.relativeRankGrade}</td>
                  {!miniView && (
                    <td>
                      {isEditing ? (
                        <button onClick={() => handleSaveEdit()}>💾</button>
                      ) : (
                        // 수정 버튼: 교사가 해당 과목 담당일 때만 보임
                        userInfo.role === "ROLE_TEACHER" &&
                        userInfo.subject === subject && (
                          <button
                            onClick={() => {
                              setEditingSubject(index.toString());
                              setEditingScore(subjectGrade.score.toString());
                            }}
                          >
                            ✏️
                          </button>
                        )
                      )}
                      <button onClick={() => handleDeleteGrade()}>🗑</button>
                    </td>
                  )}
                </tr>
              );
            })
          )}

          {!miniView && showInputRow && (
            <tr>
              <td colSpan={4}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div style={{ minWidth: "fit-content" }}>한국사</div>
                  <StyledInput
                    type="text"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    placeholder="점수"
                  />
                </div>
              </td>
              <td>
                <button onClick={handleAddGrade}>저장</button>
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
    margin: 0 4px;
  }

  .nodata {
    text-align: center;
    padding: 60px 0;
    color: #888;
    font-size: 15px;
    background-color: #f8f8f8;
  }
`;

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
