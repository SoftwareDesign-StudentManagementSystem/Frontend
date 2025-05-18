import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { UserDetailInfo, UserInfo } from "../types/members.ts";
import Card from "../components/common/Card.tsx";
// import DropDownMenu from "../components/common/DropDownMenu.tsx";
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
import {
  getFilteredStudentList,
  getMemberDetailInfo,
  getStudentInfo,
} from "../apis/members.ts";
import useUserStore from "../stores/useUserStore.ts";
import { getRandomProfileImage } from "../utils/getRandomProfileImage.ts";
import ListHeader from "../components/home/ListHeader.tsx";
import StudentList from "../components/home/StudentList.tsx";

export default function StudentLobbyPage() {
  const { userInfo, setUserDetailInfo } = useUserStore();
  console.log(userInfo);
  const profileImage = useMemo(() => getRandomProfileImage(), []);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [studentInfo, setStudentInfo] = useState<UserDetailInfo>();
  const [openModal, setOpenModal] = useState<string | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [filteredStudents, setFilteredStudents] = useState<UserInfo[]>([]);

  // // 드롭다운 선택 상태
  // const [selectedYear, setSelectedYear] = useState<number>(1);
  // const [selectedSemester, setSelectedSemester] = useState<number>(1);

  // const options = [
  //   "1학년 1학기",
  //   "1학년 2학기",
  //   "2학년 1학기",
  //   "2학년 2학기",
  //   "3학년 1학기",
  //   "3학년 2학기",
  // ];

  useEffect(() => {
    if (!userInfo.id || !id) return;

    const fetchData = async () => {
      try {
        console.log("ROLE", userInfo.role);

        if (userInfo.role === "ROLE_STUDENT") {
          const res = await getMemberDetailInfo();
          console.log("ROLE_STUDENT", res.data);
          setStudentInfo(res.data);
          setUserDetailInfo(res.data);
        } else {
          const studentRes = await getStudentInfo(Number(id));
          console.log(studentRes.data);
          setStudentInfo(studentRes.data);

          const { year, classId } = studentRes.data;
          if (year && classId) {
            const filteredRes = await getFilteredStudentList(year, classId);
            console.log(filteredRes);
            setFilteredStudents(filteredRes);
          }
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [userInfo, id]);

  const closeModal = () => setOpenModal(null);

  // // 드롭다운 선택 처리 함수
  // const handleSelect = (option: string) => {
  //   const yearMatch = option.match(/(\d)학년/);
  //   const semesterMatch = option.match(/(\d)학기/);
  //
  //   if (yearMatch && semesterMatch) {
  //     const year = Number(yearMatch[1]);
  //     const semester = Number(semesterMatch[1]);
  //
  //     setSelectedYear(year);
  //     setSelectedSemester(semester);
  //   }
  // };

  return (
    <PageWrapper>
      {/* 사이드바 (학생 리스트) */}
      {userInfo.role === "ROLE_TEACHER" && (
        <Sidebar open={sidebarOpen}>
          <ToggleButton onClick={toggleSidebar}>
            {sidebarOpen ? "«" : "»"}
          </ToggleButton>
          {sidebarOpen && (
            <Card
              cardtitle={"학생 리스트"}
              headerChildren={<ListHeader />}
              contentChildren={
                <StudentList students={filteredStudents} maxHeight={"100%"} />
              }
            />
          )}
        </Sidebar>
      )}

      {/* 오른쪽 콘텐츠 */}
      <MainContent>
        {openModal === "studentInfo" && (
          <StudentInfoModal
            onClose={closeModal}
            studentInfo={studentInfo}
            profileImage={profileImage}
          />
        )}
        {openModal === "specialNote" && <SpecialModal onClose={closeModal} />}
        {openModal === "feedback" && <FeedBackModal onClose={closeModal} />}
        {openModal === "consult" && <ConsultModal onClose={closeModal} />}
        {openModal === "attendance" && <AttendanceModal onClose={closeModal} />}
        {openModal === "grade" && (
          <GradeModal onClose={closeModal} studentId={Number(id)} />
        )}

        <div onClick={() => setOpenModal("studentInfo")}>
          <Card
            cardtitle="학생 정보"
            contentChildren={
              <StudentInfo
                studentInfo={studentInfo}
                profileImage={profileImage}
              />
            }
          />
        </div>

        <div onClick={() => setOpenModal("specialNote")}>
          <Card
            cardtitle="특기 사항"
            // headerChildren={
            //   <DropDownMenu options={options} onSelect={handleSelect} />
            // }
            contentChildren={<SpecialNoteList />}
          />
        </div>

        <div onClick={() => setOpenModal("grade")}>
          <Card
            cardtitle="성적"
            // headerChildren={
            //   <DropDownMenu options={options} onSelect={handleSelect} />
            // }
            contentChildren={
              studentInfo &&
              studentInfo.year && (
                <GradeList
                  studentId={Number(id)}
                  year={studentInfo?.year}
                  semester={1}
                  miniView={true}
                />
              )
            }
          />
        </div>

        <div onClick={() => setOpenModal("attendance")}>
          <Card
            cardtitle="출결"
            // headerChildren={
            //   <DropDownMenu options={options} onSelect={handleSelect} />
            // }
            contentChildren={<AttendanceList />}
          />
        </div>

        <div onClick={() => setOpenModal("feedback")}>
          <Card
            cardtitle="피드백"
            // headerChildren={
            //   <DropDownMenu options={options} onSelect={handleSelect} />
            // }
            contentChildren={<FeedbackList studentId={Number(id)} />}
          />
        </div>

        <div onClick={() => setOpenModal("consult")}>
          <Card
            cardtitle="상담 내역"
            // headerChildren={
            //   <DropDownMenu options={options} onSelect={handleSelect} />
            // }
            contentChildren={<ConsultList studentId={Number(id)} />}
          />
        </div>
      </MainContent>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  //padding-bottom: 500px;
  //overflow: hidden; // 전체 스크롤 차단
`;

const Sidebar = styled.div<{ open: boolean }>`
  width: ${({ open }) => (open ? "fit-content" : "0")};
  height: 100%;
  padding: ${({ open }) => (open ? "25px 16px 25px 8px" : "0")};
  transition: all 0.3s ease;
  overflow-y: auto; // 수직 스크롤 허용
  border-right: 1px solid #ddd;
  background-color: #fafafa;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 100px;
  left: 12px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  z-index: 1000;
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  //height: 100vh;
  overflow-y: auto; // 독립 스크롤
  padding: 25px 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;
