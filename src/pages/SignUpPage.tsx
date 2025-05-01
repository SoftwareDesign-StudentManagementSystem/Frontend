import styled from "styled-components";
import SignUpBox from "../components/signup/SignUpBox.tsx";

export default function SignUpPage() {
  return (
    <SignUpPageWrapper>
      <SignUpBox />
    </SignUpPageWrapper>
  );
}

const SignUpPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;
