import styled from "styled-components";
import Card from "../components/home/Card";
import StudentInfo from "../components/home/StudentInfo.tsx";

export default function HomePage() {
  return (
    <HomePageWrapper>
      <Card cardtitle={"학생 정보"}>
        <StudentInfo
          name={"배현준"}
          school={"인천해원고등학교"}
          grade={3}
          classnum={4}
          number={10}
        />
      </Card>
      <Card cardtitle={"특기 사항"} />
      <Card cardtitle={"성적"} />
      <Card cardtitle={"피드백"} />
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
