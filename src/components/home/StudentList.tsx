import styled from "styled-components";
import human from "../../assets/human.svg";
import ButtonOrange from "../common/ButtonOrange.tsx";
import { useNavigate } from "react-router-dom";

interface Student {
  grade: number;
  class: number;
  number: number;
  name: string;
  id: string;
}

const dummyStudents: Student[] = [
  { grade: 1, class: 1, number: 1, name: "김철수", id: "s10101" },
  { grade: 1, class: 1, number: 2, name: "이영희", id: "s10102" },
  { grade: 1, class: 2, number: 3, name: "박민수", id: "s10203" },
  { grade: 2, class: 1, number: 4, name: "최지훈", id: "s20104" },
  { grade: 2, class: 2, number: 5, name: "정소영", id: "s20205" },
  { grade: 3, class: 1, number: 6, name: "한도윤", id: "s30106" },
  { grade: 3, class: 3, number: 7, name: "서민지", id: "s30307" },
];

const StudentList = () => {
  const navigate = useNavigate();
  return (
    <StudentListWrapper>
      {dummyStudents.map((student) => (
        <StudentItem key={student.id}>
          <span>
            <HumanIcon src={human} />
            {student.grade}학년 {student.class}반 {student.number}번{" "}
            {student.name}
          </span>

          <ButtonOrange
            text={"자세히 보기"}
            onClick={() => {
              navigate("/studentlobby");
            }}
          />
        </StudentItem>
      ))}
    </StudentListWrapper>
  );
};

export default StudentList;

const StudentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
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
