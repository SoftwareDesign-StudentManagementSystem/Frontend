// GradeModal.tsx
import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import GradeSemesterView from "./GradeSemesterView.tsx";
import { useState } from "react";
import GradeList from "../../studentlobby/GradeList.tsx";

import ButtonWhite from "../../common/ButtonWhite.tsx"; // 추가

const GradeModal = ({
  onClose,
  studentId,
}: {
  onClose: () => void;
  studentId: number;
}) => {
  return (
    <Modal
      onClose={onClose}
      content={<GradeModalContent studentId={studentId} />}
      title={"성적"}
    />
  );
};
export default GradeModal;

const gradeData = [
  { grade: 1, semester: 1 },
  { grade: 1, semester: 2 },
  { grade: 2, semester: 1 },
  { grade: 2, semester: 2 },
  { grade: 3, semester: 1 },
  { grade: 3, semester: 2 },
];

import useUserStore from "../../../stores/useUserStore.ts"; // 추가

const GradeModalContent = ({ studentId }: { studentId: number }) => {
  const { userInfo } = useUserStore();
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<{
    grade: number;
    semester: number;
  } | null>(null);

  // 현재 연월로 학기 계산 (3~8월: 1학기, 9~2월: 2학기)
  const getCurrentSemester = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    return month >= 3 && month <= 8 ? 1 : 2;
  };

  const currentSemester = getCurrentSemester();
  const userGrade = userInfo?.year ?? 1; // 기본값 1학년

  // userGrade까지 학기 리스트 생성
  const filteredGradeData = gradeData
    .filter(({ grade, semester }) => {
      if (grade < userGrade) return true;
      if (grade === userGrade && semester <= currentSemester) return true;
      return false;
    })
    .sort((a, b) => {
      // 최신 학년/학기 순으로 정렬
      if (a.grade !== b.grade) return b.grade - a.grade;
      return b.semester - a.semester;
    });

  const handleCardClick = (grade: number, semester: number) => {
    setSelectedGrade({ grade, semester });
    setIsAddMode(true);
  };

  return (
    <GradeModalContentWrapper>
      {!isAddMode ? (
        <GradeViewWrapper>
          {filteredGradeData.map(({ grade, semester }) => (
            <GradeRow key={`${grade}-${semester}`}>
              <div
                className="leftcontent"
                onClick={() => handleCardClick(grade, semester)}
              >
                <Card
                  cardtitle={`${grade}학년 ${semester}학기`}
                  contentChildren={
                    <GradeList
                      studentId={Number(studentId)}
                      year={grade}
                      semester={semester}
                      miniView={true}
                    />
                  }
                />
              </div>
            </GradeRow>
          ))}
        </GradeViewWrapper>
      ) : (
        <>
          <div style={{ width: "fit-content", paddingBottom: "10px" }}>
            <ButtonWhite
              text={"< 목록으로"}
              onClick={() => setIsAddMode(false)}
            />
          </div>
          {selectedGrade && (
            <GradeSemesterView
              year={selectedGrade.grade}
              semester={selectedGrade.semester}
              studentId={studentId}
            />
          )}
        </>
      )}
    </GradeModalContentWrapper>
  );
};

const GradeModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 100%;

  button {
    width: 100%;
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: #e2e0db;
  }
`;

const GradeViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;

const GradeRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;

  .leftcontent {
    cursor: pointer;
    width: 100%;
  }
`;

// const Chart = styled.img`
//   width: 50%;
// `;
