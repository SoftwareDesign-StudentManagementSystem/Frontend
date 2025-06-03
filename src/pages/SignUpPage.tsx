import styled from "styled-components";
import SignUpBox from "../components/signup/SignUpBox";

export default function SignUpPage() {
  return (
    <SignUpPageWrapper>
      <SignUpBox />
    </SignUpPageWrapper>
  );
}

const SignUpPageWrapper = styled.div`
  width: 98vw;
  height: 98vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
