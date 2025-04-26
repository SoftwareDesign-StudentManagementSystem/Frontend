import styled from "styled-components";
import human from "../../assets/human.svg";
import ButtonOrange from "../common/ButtonOrange.tsx";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../types/members.ts";

const StudentList = ({ students }: { students: UserInfo[] }) => {
  const navigate = useNavigate();
  return (
    <StudentListWrapper>
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
              navigate(`/studentlobby?id=${student.id}`); // ✅ id를 쿼리스트링으로 추가
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
