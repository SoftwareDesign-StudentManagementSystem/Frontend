import styled from "styled-components";
import LoginBox from "../components/login/LoginBox.tsx";

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <LoginBox />
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;
