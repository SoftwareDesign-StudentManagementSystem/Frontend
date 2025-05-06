import styled from "styled-components";
import logoimg from "../../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/members.ts"; // 로그인 요청 함수 import

const LoginBox = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 로그인 오류 메시지를 위한 state 추가

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await login(Number(id), password); // 아이디를 숫자로 변환하여 전달
      console.log("로그인 성공:", result);
      // 로그인 성공 후, 홈 화면으로 이동
      navigate("/home");
    } catch (error) {
      setError(
        "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요." + error,
      );
    }
  };

  return (
    <LoginBoxWrapper>
      <Logo src={logoimg} />
      <ContentWrapper>
        <div className="maintitle">
          안녕하세요!
          <br />
          <span style={{ color: "#ffb608" }}>인천송도고</span> iEdu입니다
        </div>
        <div className="inputWrapper">
          <div className="inputtitle">아이디</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <InputBox
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        </div>
        <div className="inputWrapper">
          <div className="inputtitle">비밀번호</div>
          <InputBox
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <ErrorText>{error}</ErrorText>} {/* 오류 메시지 출력 */}
        <RegisterLine>
          학부모님! 아직 회원이 아니신가요?
          <button
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입
          </button>
        </RegisterLine>
        <SubmitButton onClick={handleLogin}>로그인</SubmitButton>
      </ContentWrapper>
    </LoginBoxWrapper>
  );
};

export default LoginBox;

const LoginBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 200px;
  gap: 20px;
  width: fit-content;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 40px 16px;
    width: 100%;
    box-sizing: border-box;
    border: none;
  }
`;

const ContentWrapper = styled.div`
  width: 50%;
  min-width: 400px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  .maintitle {
    font-weight: 600;
    font-size: 30px;
    line-height: 150%;
    text-align: center;
    text-transform: capitalize;
    color: #000000;
  }

  .inputWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 8px;
  }

  .inputtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #808080;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

const Logo = styled.img`
  width: 46px;
  height: 44px;
`;

const InputBox = styled.input`
  flex: 1;
  //width: 100%;
  height: 48px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;

  box-sizing: border-box;
  padding: 12px 20px;
`;

const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  box-sizing: border-box;
  gap: 10px;
  width: 100%;
  height: fit-content;
  background: #ffb608;
  border-radius: 6px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%; /* identical to box height, or 24px */
  text-transform: capitalize;
  color: #ffffff;
`;
const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 8px;
`;

const RegisterLine = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  button {
    background: none;
    border: none;
    padding: 0;
    font-weight: bold;
    color: #007bff; /* 하이퍼링크 색상 */
    text-decoration: underline;
    cursor: pointer;
  }

  button:hover {
    color: #0056b3; /* hover 시 더 진한 파란색 */
    text-decoration: underline;
  }
`;
