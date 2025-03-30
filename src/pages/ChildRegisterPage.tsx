import styled from "styled-components";
import ChildRegisterBox from "../components/childregister/ChildRegisterBox.tsx";

export default function ChildRegisterPage() {
  return (
    <ChildRegisterPageWrapper>
      <ChildRegisterBox />
    </ChildRegisterPageWrapper>
  );
}

const ChildRegisterPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;
