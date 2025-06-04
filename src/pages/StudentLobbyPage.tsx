import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { UserDetailInfo, UserInfo } from "../types/members";
import Card from "../components/common/Card";
import DropDownMenu from "../components/common/DropDownMenu";
import StudentInfo from "../components/studentlobby/StudentInfo";
import SpecialNoteList from "../components/studentlobby/SpecialNoteList";
import GradeList from "../components/studentlobby/GradeList";
import FeedbackList from "../components/studentlobby/FeedbackList";
import ConsultList from "../components/studentlobby/ConsultList";
import AttendanceList from "../components/studentlobby/AttendanceList";

import StudentInfoModal from "../components/Modal/StudentInfoModal";
import FeedBackModal from "../components/Modal/FeedBack/FeedBackModal";
import ConsultModal from "../components/Modal/Consult/ConsultModal";
import SpecialModal from "../components/Modal/SpecialNote/SpecialModal";
import AttendanceModal from "../components/Modal/Attendance/AttendanceModal";
import GradeModal from "../components/Modal/Grade/GradeModal";
import {
  getFilteredStudentList,
  getMemberDetailInfo,
  getStudentInfo,
} from "../apis/members";
import useUserStore from "../stores/useUserStore";
import { getRandomProfileImage } from "../utils/getRandomProfileImage";
import ListHeader from "../components/home/ListHeader";
import StudentList from "../components/home/StudentList";
import getCurrentSemester from "../utils/getCurrentSemester";
import { useLoading } from "../stores/LoadingProvider";

export default function StudentLobbyPage() {
  const { showLoading, hideLoading } = useLoading();

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

  // 드롭다운 선택 상태
  const [selectedYear, setSelectedYear] = useState<number>(
    Number(studentInfo?.year),
  );
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("1학년 1학기");
  useEffect(() => {
    if (studentInfo?.year) {
      const semester = getCurrentSemester();
      const year = studentInfo.year;

      const availableOptions = generateAvailableOptions(year, semester);

      setOptions(availableOptions);
      const defaultOpt = `${year}학년 ${semester}학기`;
      setSelectedOption(defaultOpt);
      setSelectedYear(year);
      setSelectedSemester(semester);
    }
  }, [studentInfo]);

  useEffect(() => {
    if (!userInfo.id || !id) return;
    showLoading();

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
      } finally {
        hideLoading();
      }
    };

    fetchData();
  }, [userInfo, id]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [id]);

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

  const generateAvailableOptions = (year: number, semester: number) => {
    const allOptions = [
      { year: 1, semester: 1 },
      { year: 1, semester: 2 },
      { year: 2, semester: 1 },
      { year: 2, semester: 2 },
      { year: 3, semester: 1 },
      { year: 3, semester: 2 },
    ];

    return allOptions
      .filter(
        (opt) =>
          opt.year < year || (opt.year === year && opt.semester <= semester),
      )
      .map((opt) => `${opt.year}학년 ${opt.semester}학기`);
  };

  return (
    <PageWrapper>
      {/* 토글 버튼은 사이드바 바깥에 있어야 함 */}
      {userInfo.role === "ROLE_TEACHER" && (
        <ToggleButton onClick={toggleSidebar}>
          {sidebarOpen ? "«" : "»"}
        </ToggleButton>
      )}
      {/* 사이드바 (학생 리스트) */}
      {userInfo.role === "ROLE_TEACHER" && (
        <Sidebar open={sidebarOpen}>
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
        {openModal === "specialNote" && (
          <SpecialModal onClose={closeModal} studentInfo={studentInfo} />
        )}
        {openModal === "feedback" && studentInfo && (
          <FeedBackModal onClose={closeModal} studentInfo={studentInfo} />
        )}
        {openModal === "consult" && studentInfo && (
          <ConsultModal onClose={closeModal} studentInfo={studentInfo} />
        )}
        {openModal === "attendance" && studentInfo && (
          <AttendanceModal onClose={closeModal} studentInfo={studentInfo} />
        )}
        {openModal === "grade" && (
          <GradeModal
            onClose={closeModal}
            studentId={Number(id)}
            studentInfo={studentInfo}
          />
        )}

        <div onClick={() => setOpenModal("studentInfo")}>
          <Card
            cardtitle="학생 정보"
            headerChildren={
              <DropDownMenu
                options={options}
                onSelect={handleSelect}
                defaultSelected={selectedOption}
              />
            }
            contentChildren={
              <StudentInfo
                studentInfo={studentInfo}
                profileImage={profileImage}
              />
            }
          />
        </div>

        <div
          onClick={
            userInfo.role !== "ROLE_STUDENT"
              ? () => setOpenModal("specialNote")
              : undefined
          }
        >
          <Card
            cardtitle="특기 사항"
            contentChildren={
              userInfo.role === "ROLE_STUDENT" ? (
                <p
                  style={{
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#888",
                    fontSize: "16px",
                  }}
                >
                  교사 및 학부모만 볼 수 있습니다.
                </p>
              ) : (
                <SpecialNoteList miniView={true} />
              )
            }
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
                  year={selectedYear}
                  semester={selectedSemester}
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
            contentChildren={
              <AttendanceList
                studentId={Number(id)}
                miniview={true}
                selectedGrade={selectedYear}
              />
            }
          />
        </div>

        <div onClick={() => setOpenModal("feedback")}>
          <Card
            cardtitle="피드백"
            // headerChildren={
            //   <DropDownMenu options={options} onSelect={handleSelect} />
            // }
            contentChildren={
              <FeedbackList studentId={Number(id)} miniView={true} />
            }
          />
        </div>

        <div
          onClick={
            userInfo.role !== "ROLE_STUDENT"
              ? () => setOpenModal("consult")
              : undefined
          }
        >
          <Card
            cardtitle="상담 내역"
            contentChildren={
              userInfo.role === "ROLE_STUDENT" ? (
                <p
                  style={{
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#888",
                    fontSize: "16px",
                  }}
                >
                  교사 및 학부모만 볼 수 있습니다.
                </p>
              ) : (
                <ConsultList studentId={Number(id)} miniView={true} />
              )
            }
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
  position: fixed; /* 💡 화면 위에 떠있도록 고정 */
  top: 80px;
  left: 0;
  width: 400px;
  max-width: 100%;
  height: calc(100vh - 80px); /* 💡 뷰포트 높이에서 top만큼 제외 */
  padding: 45px 16px;
  box-sizing: border-box;
  background-color: #fafafa;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.3s ease;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 90px;
  left: 16px;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  z-index: 1100; /* 💡 사이드바보다 위에 */
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    top: 70px;
  }
`;
const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 25px 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 16px 8px;
  }
`;
