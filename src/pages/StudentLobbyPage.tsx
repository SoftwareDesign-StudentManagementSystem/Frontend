import styled from "styled-components";
import Card from "../components/common/Card.tsx";
import StudentInfo from "../components/studentlobby/StudentInfo.tsx";
import SpecialNoteList from "../components/studentlobby/SpecialNoteList.tsx";
import GradeList from "../components/studentlobby/GradeList.tsx";
import FeedbackList from "../components/studentlobby/FeedbackList.tsx";
import ConsultList from "../components/studentlobby/ConsultList.tsx";

export default function StudentLobbyPage() {
  return (
    <HomePageWrapper>
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
      <Card cardtitle={"특기 사항"} contentChildren={<SpecialNoteList />} />
      <Card cardtitle={"성적"} contentChildren={<GradeList />} />
      <Card cardtitle={"출결"} />
      <Card cardtitle={"피드백"} contentChildren={<FeedbackList />} />
      <Card cardtitle={"상담 내역"} contentChildren={<ConsultList />} />
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
