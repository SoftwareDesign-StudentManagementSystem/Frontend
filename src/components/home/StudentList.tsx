import styled from "styled-components";
import human from "../../assets/human.svg";
import ButtonOrange from "../common/ButtonOrange.tsx";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../types/members.ts";

interface StudentListProps {
  students: UserInfo[];
  maxHeight?: string; // maxHeight를 props로 받음
}

const StudentList = ({ students, maxHeight = "400px" }: StudentListProps) => {
  const navigate = useNavigate();
  return (
    <StudentListWrapper $maxHeight={maxHeight}>
      {students.map((student) => (
        <StudentItem key={student.id}>
          <span>
            <HumanIcon src={human} />
            {student.year}학년 {student.classId}반 {student.number}번{" "}
            {student.name}
          </span>

          <ButtonOrange
            text={"자세히 보기"}
            onClick={() => {
              navigate(`/studentlobby?id=${student.id}`);
            }}
          />
        </StudentItem>
      ))}
    </StudentListWrapper>
  );
};

export default StudentList;

const StudentListWrapper = styled.div<{ $maxHeight: string }>`
  display: flex;
  flex-direction: column;
  max-height: ${({ $maxHeight }) => $maxHeight};
  // min-height: ${({ $maxHeight }) => $maxHeight};
  overflow-y: auto;
`;

const StudentItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  padding: 12px 20px;
  border-bottom: 1px solid #f1f2f8;
  box-sizing: border-box;

  span {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const HumanIcon = styled.img`
  margin-right: 16px;
`;
