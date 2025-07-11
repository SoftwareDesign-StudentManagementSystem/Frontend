// GradeModal
import Modal from "../Modal";
import styled from "styled-components";

import Card from "../../common/Card";
import GradeSemesterView from "./GradeSemesterView";
import { useState } from "react";
import GradeList from "../../studentlobby/GradeList";

import ButtonWhite from "../../common/ButtonWhite";

const GradeModal = ({
  onClose,
  studentId,
  studentInfo,
}: {
  onClose: () => void;
  studentId: number;
  studentInfo?: UserDetailInfo;
}) => {
  return (
    <Modal
      onClose={onClose}
      content={
        <GradeModalContent studentId={studentId} studentInfo={studentInfo} />
      }
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

import getCurrentSemester from "../../../utils/getCurrentSemester";
import { UserDetailInfo } from "../../../types/members";

const GradeModalContent = ({
  studentId,
  studentInfo,
}: {
  studentId: number;
  studentInfo?: UserDetailInfo;
}) => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<{
    grade: number;
    semester: number;
  } | null>(null);

  const currentSemester = getCurrentSemester();
  const userGrade = studentInfo?.year ?? 1; // 기본값 1학년

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
