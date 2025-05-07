import styled from "styled-components";
import Card from "../components/common/Card.tsx";
import SearchStudent from "../components/home/SearchStudent";
import ListHeader from "../components/home/ListHeader";
import StudentList from "../components/home/StudentList.tsx";
import UserInfoBox from "../components/home/UserInfoBox.tsx";
import useUserStore from "../stores/useUserStore.ts";
import { useEffect, useState } from "react";
import { UserInfo } from "../types/members.ts";
import {
  getMemberDetailInfo,
  getStudentList,
  getFilteredStudentList,
} from "../apis/members.ts";
import { useNavigate } from "react-router-dom";
import ButtonWhite from "../components/common/ButtonWhite.tsx";
import SlideBanner from "../components/home/SlideBanner.tsx";

export default function HomePage() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const [role, setRole] = useState(userInfo.role || "");

  useEffect(() => {
    setRole(userInfo.role);

    if (userInfo.role === "ROLE_STUDENT") {
      navigate("/studentlobby?id=" + userInfo.id);
    }
  }, [userInfo]);

  const roleString =
    role === "ROLE_TEACHER"
      ? "교사"
      : role === "ROLE_STUDENT"
        ? "학생"
        : role === "ROLE_PARENT"
          ? "학부모"
          : "관리자";

  const [students, setStudents] = useState<UserInfo[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<UserInfo[]>([]);

  useEffect(() => {
    if (userInfo?.role === "ROLE_PARENT") {
      getMemberDetailInfo().then((res) => {
        console.log("getMemberDetailInfo", res.data);
        setStudents(res.data.childrenList);
        setFilteredStudents(res.data.childrenList);
      });
    } else if (userInfo?.role === "ROLE_TEACHER") {
      getStudentList().then((res) => {
        console.log(res);
        setStudents(res);
        setFilteredStudents(res);
      });
    }
  }, [userInfo]);

  const handleSearch = async (searchParams: {
    grade: string;
    classnum: string;
    studentid: string;
    name: string;
  }) => {
    const { grade, classnum, studentid, name } = searchParams;

    if (!grade) {
      alert("학년은 필수로 선택해야 합니다.");
      return;
    }

    try {
      const res = await getFilteredStudentList(
        Number(grade),
        classnum ? Number(classnum) : undefined,
        studentid ? Number(studentid) : undefined,
      );

      let filtered = res;

      // 번호 필터링은 프론트에서 진행
      if (studentid) {
        filtered = filtered.filter(
          (student) => student.number === Number(studentid),
        );
      }
      // 이름 필터링은 프론트에서 진행
      if (name) {
        filtered = filtered.filter((student) => student.name?.includes(name));
      }

      setFilteredStudents(filtered);
    } catch (err) {
      console.error("학생 필터링 실패:", err);
      alert("학생 검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <HomePageWrapper>
      <LeftContentWrapper>
        {role === "ROLE_TEACHER" && (
          <>
            <Card
              cardtitle={"학생 리스트 검색"}
              contentChildren={
                <SearchStudent students={students} onSearch={handleSearch} />
              }
            />
          </>
        )}

        <Card
          cardtitle={"학생 리스트"}
          headerChildren={<ListHeader />}
          contentChildren={<StudentList students={filteredStudents} />}
        />
        {userInfo.role === "ROLE_PARENT" && (
          <>
            <ButtonWhite
              text={"자녀 추가하기"}
              onClick={() => {
                navigate("/childregister");
              }}
            />
          </>
        )}
      </LeftContentWrapper>

      <RightContentWrapper>
        <Card
          cardtitle={`${roleString} 정보`}
          contentChildren={
            <UserInfoBox userInfo={userInfo} roleString={roleString} />
          }
        />
        <SlideBanner />
      </RightContentWrapper>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  padding: 25px 32px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 25px 10px;
  }
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
