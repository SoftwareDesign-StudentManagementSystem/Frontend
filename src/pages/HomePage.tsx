import styled from "styled-components";
import Card from "../components/common/Card.tsx";
import SearchStudent from "../components/home/SearchStudent";
import ListHeader from "../components/home/ListHeader";
import StudentList from "../components/home/StudentList.tsx";
import UserInfoBox from "../components/home/UserInfoBox.tsx";
import useUserStore from "../stores/useUserStore.ts";
import { useEffect, useState } from "react";
import { UserInfo } from "../types/members.ts";
import { getStudentList } from "../apis/members.ts";

// (앞부분은 동일)

export default function HomePage() {
  const { userInfo } = useUserStore();
  const roleString =
    userInfo?.role === "ROLE_TEACHER"
      ? "교사"
      : userInfo.role === "ROLE_STUDENT"
        ? "학생"
        : userInfo.role === "ROLE_PARENT"
          ? "학부모"
          : "관리자";

  const [students, setStudents] = useState<UserInfo[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<UserInfo[]>([]);

  useEffect(() => {
    getStudentList().then((res) => {
      console.log(res);
      setStudents(res);
      setFilteredStudents(res);
    });
  }, []);

  const handleSearch = (searchParams: {
    grade: string;
    classnum: string;
    studentid: string;
    name: string;
  }) => {
    const { grade, classnum, studentid, name } = searchParams;
    const filtered = students.filter((student) => {
      const matchesGrade = grade ? student.year?.toString() === grade : true;
      const matchesClassnum = classnum
        ? student.classId?.toString() === classnum
        : true;
      const matchesStudentid = studentid
        ? student.number?.toString() === studentid
        : true;
      const matchesName = name ? student.name?.toString() === name : true;
      return matchesGrade && matchesClassnum && matchesStudentid && matchesName;
    });
    setFilteredStudents(filtered);
  };

  return (
    <HomePageWrapper>
      <LeftContentWrapper>
        <Card
          cardtitle={"학생 리스트 검색"}
          contentChildren={
            <SearchStudent students={students} onSearch={handleSearch} />
          }
        />
        <Card
          cardtitle={"학생 리스트"}
          headerChildren={<ListHeader />}
          contentChildren={<StudentList students={filteredStudents} />}
        />
      </LeftContentWrapper>

      <RightContentWrapper>
        <Card
          cardtitle={`${roleString} 정보`}
          contentChildren={
            <UserInfoBox userInfo={userInfo} roleString={roleString} />
          }
        />
      </RightContentWrapper>
    </HomePageWrapper>
  );
}

// styled-components는 동일

const HomePageWrapper = styled.div`
  padding: 25px 32px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const LeftContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 30px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`;
