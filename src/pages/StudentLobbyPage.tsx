import styled from "styled-components";
import Card from "../components/common/Card.tsx";
import DropDownMenu from "../components/common/DropDownMenu.tsx";
import StudentInfo from "../components/studentlobby/StudentInfo.tsx";
import SpecialNoteList from "../components/studentlobby/SpecialNoteList.tsx";
import GradeList from "../components/studentlobby/GradeList.tsx";
import FeedbackList from "../components/studentlobby/FeedbackList.tsx";
import ConsultList from "../components/studentlobby/ConsultList.tsx";

import StudentInfoModal from "../components/Modal/StudentInfoModal.tsx";
import FeedBackModal from "../components/Modal/FeedBack/FeedBackModal.tsx";
import { useState } from "react";
import ConsultModal from "../components/Modal/Consult/ConsultModal.tsx";
import SpecialModal from "../components/Modal/SpecialNote/SpecialModal.tsx";
import AttendanceModal from "../components/Modal/Attendance/AttendanceModal.tsx";
import AttendanceList from "../components/studentlobby/AttendanceList.tsx";
import GradeModal from "../components/Modal/Grade/GradeModal.tsx";

export default function StudentLobbyPage() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const closeModal = () => setOpenModal(null);

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

  return (
    <HomePageWrapper>
      {/* 모달들 */}
      {openModal === "studentInfo" && <StudentInfoModal onClose={closeModal} />}
      {openModal === "specialNote" && <SpecialModal onClose={closeModal} />}
      {openModal === "feedback" && <FeedBackModal onClose={closeModal} />}
      {openModal === "consult" && <ConsultModal onClose={closeModal} />}
      {openModal === "attendance" && <AttendanceModal onClose={closeModal} />}
      {openModal === "grade" && <GradeModal onClose={closeModal} />}

      {/* 카드들 */}
      <div onClick={() => setOpenModal("studentInfo")}>
        <Card
          cardtitle={"학생 정보"}
          contentChildren={
            <StudentInfo
              name={"배현준"}
              school={"인천해원고등학교"}
              grade={3}
              classnum={4}
              number={10}
            />
          }
        />
      </div>

      <div onClick={() => setOpenModal("specialNote")}>
        <Card
          cardtitle={"특기 사항"}
          headerChildren={<DropDownMenu options={options} />}
          contentChildren={<SpecialNoteList />}
        />
      </div>

      <div onClick={() => setOpenModal("grade")}>
        <Card
          cardtitle={"성적"}
          headerChildren={<DropDownMenu options={options} />}
          contentChildren={<GradeList />}
        />
      </div>

      <div onClick={() => setOpenModal("attendance")}>
        <Card
          cardtitle={"출결"}
          headerChildren={<DropDownMenu options={options} />}
          contentChildren={<AttendanceList />}
        />
      </div>

      <div onClick={() => setOpenModal("feedback")}>
        <Card
          cardtitle={"피드백"}
          headerChildren={<DropDownMenu options={options} />}
          contentChildren={<FeedbackList />}
        />
      </div>

      <div onClick={() => setOpenModal("consult")}>
        <Card
          cardtitle={"상담 내역"}
          headerChildren={<DropDownMenu options={options} />}
          contentChildren={<ConsultList />}
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
`;
