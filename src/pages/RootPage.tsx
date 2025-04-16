import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function RootPage() {
  return (
    <RootPageWrapper>
      <Header />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </RootPageWrapper>
  );
}

const RootPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 97vh; /* 전체 화면 높이 */
`;

const ContentArea = styled.main`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;
