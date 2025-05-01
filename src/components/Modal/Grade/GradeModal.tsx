// GradeModal.tsx
import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import GradeSemesterView from "./GradeSemesterView.tsx";
import { useState } from "react";
import GradeList from "../../studentlobby/GradeList.tsx";
// import chart from "../../../assets/chart.svg";
import GradeRadarChart from "./GradeRadarChart";
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

const GradeModalContent = ({ studentId }: { studentId: number }) => {
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<{
    grade: number;
    semester: number;
  } | null>(null);

  const handleCardClick = (grade: number, semester: number) => {
    setSelectedGrade({ grade, semester });
    setIsAddMode(true);
  };

  return (
    <GradeModalContentWrapper>
      {!isAddMode ? (
        <GradeViewWrapper>
          {gradeData.map(({ grade, semester }, index) => (
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
          <GradeSemesterView
            year={selectedGrade?.grade}
            semester={selectedGrade?.semester}
            studentId={studentId}
          />
          <ButtonWhite
            text={"목록으로"}
            onClick={() => {
              setIsAddMode(false);
            }}
          />
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
