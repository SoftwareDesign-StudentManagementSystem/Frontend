import styled from "styled-components";
import Card from "../components/common/Card.tsx";
import SearchStudent from "../components/home/SearchStudent";
import ListHeader from "../components/home/ListHeader";
import StudentList from "../components/home/StudentList.tsx";
import UserInfo from "../components/home/UserInfo";

export default function HomePage() {
  return (
    <HomePageWrapper>
      <LeftContentWrapper>
        <Card
          cardtitle={"학생 리스트 검색"}
          contentChildren={<SearchStudent />}
        />
        <Card
          cardtitle={"학생 리스트"}
          headerChildren={<ListHeader />}
          contentChildren={<StudentList />}
        />
      </LeftContentWrapper>

      <RightContentWrapper>
        <Card
          cardtitle={"교사 정보"}
          contentChildren={
            <UserInfo
              name="배현준"
              school="광휘고등학교"
              grade={3}
              classnum={4}
              number={5}
            />
          }
        />
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
