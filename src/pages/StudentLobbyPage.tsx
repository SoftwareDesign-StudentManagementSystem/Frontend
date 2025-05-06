import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { UserDetailInfo } from "../types/members.ts";
import Card from "../components/common/Card.tsx";
import DropDownMenu from "../components/common/DropDownMenu.tsx";
import StudentInfo from "../components/studentlobby/StudentInfo.tsx";
import SpecialNoteList from "../components/studentlobby/SpecialNoteList.tsx";
import GradeList from "../components/studentlobby/GradeList.tsx";
import FeedbackList from "../components/studentlobby/FeedbackList.tsx";
import ConsultList from "../components/studentlobby/ConsultList.tsx";
import AttendanceList from "../components/studentlobby/AttendanceList.tsx";

import StudentInfoModal from "../components/Modal/StudentInfoModal.tsx";
import FeedBackModal from "../components/Modal/FeedBack/FeedBackModal.tsx";
import ConsultModal from "../components/Modal/Consult/ConsultModal.tsx";
import SpecialModal from "../components/Modal/SpecialNote/SpecialModal.tsx";
import AttendanceModal from "../components/Modal/Attendance/AttendanceModal.tsx";
import GradeModal from "../components/Modal/Grade/GradeModal.tsx";
import { getMemberDetailInfo, getStudentInfo } from "../apis/members.ts";
import useUserStore from "../stores/useUserStore.ts";

export default function StudentLobbyPage() {
  const { userInfo, setUserDetailInfo } = useUserStore();
  console.log(userInfo);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [studentInfo, setStudentInfo] = useState<UserDetailInfo>();
  const [openModal, setOpenModal] = useState<string | null>(null);

  // 드롭다운 선택 상태
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  const options = [
    "1학년 1학기",
    "1학년 2학기",
    "2학년 1학기",
    "2학년 2학기",
    "3학년 1학기",
    "3학년 2학기",
    "4학년 1학기",
    "4학년 2학기",
  ];

  useEffect(() => {
    if (!userInfo.id) return;

    if (id) {
      console.log("ROLE" + userInfo.role);
      if (userInfo.role === "ROLE_STUDENT") {
        getMemberDetailInfo().then((res) => {
          console.log("ROLE_STUDENT", res.data);
          setStudentInfo(res.data);
          setUserDetailInfo(res.data);
        });
      } else {
        getStudentInfo(Number(id)).then((res) => {
          console.log(res.data);
          setStudentInfo(res.data);
        });
      }
    }
  }, [userInfo]);

  const closeModal = () => setOpenModal(null);

  // 드롭다운 선택 처리 함수
  const handleSelect = (option: string) => {
    const yearMatch = option.match(/(\d)학년/);
    const semesterMatch = option.match(/(\d)학기/);

    if (yearMatch && semesterMatch) {
      const year = Number(yearMatch[1]);
      const semester = Number(semesterMatch[1]);

      setSelectedYear(year);
      setSelectedSemester(semester);
    }
  };

  return (
    <HomePageWrapper>
      {/* 모달들 */}
      {openModal === "studentInfo" && (
        <StudentInfoModal onClose={closeModal} studentInfo={studentInfo} />
      )}
      {openModal === "specialNote" && <SpecialModal onClose={closeModal} />}
      {openModal === "feedback" && <FeedBackModal onClose={closeModal} />}
      {openModal === "consult" && <ConsultModal onClose={closeModal} />}
      {openModal === "attendance" && <AttendanceModal onClose={closeModal} />}
      {openModal === "grade" && (
        <GradeModal onClose={closeModal} studentId={Number(id)} />
      )}

      {/* 카드들 */}
      <div onClick={() => setOpenModal("studentInfo")}>
        <Card
          cardtitle="학생 정보"
          contentChildren={<StudentInfo studentInfo={studentInfo} />}
        />
      </div>

      <div onClick={() => setOpenModal("specialNote")}>
        <Card
          cardtitle="특기 사항"
          headerChildren={
            <DropDownMenu options={options} onSelect={handleSelect} />
          }
          contentChildren={<SpecialNoteList />}
        />
      </div>

      <div onClick={() => setOpenModal("grade")}>
        <Card
          cardtitle="성적"
          headerChildren={
            <DropDownMenu options={options} onSelect={handleSelect} />
          }
          contentChildren={
            <GradeList
              studentId={Number(id)}
              year={selectedYear}
              semester={selectedSemester}
              miniView={true}
            />
          }
        />
      </div>

      <div onClick={() => setOpenModal("attendance")}>
        <Card
          cardtitle="출결"
          headerChildren={
            <DropDownMenu options={options} onSelect={handleSelect} />
          }
          contentChildren={<AttendanceList />}
        />
      </div>

      <div onClick={() => setOpenModal("feedback")}>
        <Card
          cardtitle="피드백"
          headerChildren={
            <DropDownMenu options={options} onSelect={handleSelect} />
          }
          contentChildren={<FeedbackList studentId={Number(id)} />}
        />
      </div>

      <div onClick={() => setOpenModal("consult")}>
        <Card
          cardtitle="상담 내역"
          headerChildren={
            <DropDownMenu options={options} onSelect={handleSelect} />
          }
          contentChildren={<ConsultList studentId={Number(id)} />}
        />
      </div>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  padding: 25px 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;
