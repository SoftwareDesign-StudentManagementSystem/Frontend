// import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
// import Nav from "../components/common/Nav";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function RootPage() {
  return (
    <RootPageWrapper>
      <Header />
      {/*<Nav />*/}
      <main style={{ width: "100%", height: "100%" }}>
        <Outlet />
      </main>
      {/*<Footer />*/}
    </RootPageWrapper>
  );
}

const RootPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
