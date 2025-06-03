import styled from "styled-components";
import LoginBox from "../components/login/LoginBox";

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <LoginBox />
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div`
  width: 98vw;
  height: 98vh;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;
