import styled from "styled-components";
import ChildRegisterBox from "../components/childregister/ChildRegisterBox";

export default function ChildRegisterPage() {
  return (
    <ChildRegisterPageWrapper>
      <ChildRegisterBox />
    </ChildRegisterPageWrapper>
  );
}

const ChildRegisterPageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;
