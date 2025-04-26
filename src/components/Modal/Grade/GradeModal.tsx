// GradeModal.tsx
import Modal from "../Modal.tsx";
import styled from "styled-components";

import Card from "../../common/Card.tsx";
import GradeAdd from "./GradeAdd.tsx";
import { useState } from "react";
import GradeList from "../../studentlobby/GradeList.tsx";
import chart from "../../../assets/chart.svg";

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
          {gradeData.map(({ grade, semester }) => (
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
              <Chart src={chart} />
            </GradeRow>
          ))}
        </GradeViewWrapper>
      ) : (
        <GradeAdd
          year={selectedGrade?.grade}
          semester={selectedGrade?.semester}
          studentId={studentId}
        />
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
    width: 50%;
  }
`;

const Chart = styled.img`
  width: 50%;
`;
