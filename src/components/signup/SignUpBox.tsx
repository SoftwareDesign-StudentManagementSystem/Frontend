import styled from "styled-components";
import logoimg from "../../assets/logo.svg";
import { useState } from "react";
import { signup } from "../../apis/members.ts";
import { useNavigate } from "react-router-dom"; // signup API import 추가

const SignUpBox = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 여기서는 추가 정보는 임시로 입력 (추후 input 추가 가능)
      const result = await signup(
        password, // password
        name, // name
        "010-0000-0000", // phone (임시)
        "example@email.com", // email (임시)
        "2000-01-01", // birthday (임시)
        "인천해원고", // schoolName (고정)
        "MALE", // gender (임시)
      );

      if (result) {
        alert(
          "회원가입을 성공하였습니다! 다음 페이지에서 자녀 등록을 완료해 주세요.",
        );
        // 이후 이동 처리 필요시 추가 (ex. 로그인 페이지 이동)
        navigate("/childregister");
      }
    } catch (error: any) {
      alert(error.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <SignUpBoxWrapper>
      <Logo src={logoimg} />
      <ContentWrapper>
        <div className="maintitle">
          안녕하세요!
          <br />
          <span style={{ color: "#ffb608" }}>인천해원고</span> iEdu입니다
        </div>
        <div className="inputWrapper">
          <div className="inputtitle">이름</div>
          <InputBox
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
              placeholder="숫자 형태의 아이디를 입력해주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <DuplicationChkBtn>중복 확인</DuplicationChkBtn>
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
        <div className="inputWrapper">
          <div className="inputtitle">비밀번호 확인</div>
          <InputBox
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <SubmitButton onClick={handleSignUp}>회원가입하기</SubmitButton>
      </ContentWrapper>
    </SignUpBoxWrapper>
  );
};

export default SignUpBox;

const SignUpBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 200px;
  gap: 20px;
  width: fit-content;
  height: fit-content;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 24px 16px;
    width: 100%;
    box-sizing: border-box;
    border: none;
  }
`;

const ContentWrapper = styled.div`
  width: 40%;
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

const DuplicationChkBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;

  width: 98px;
  height: 48px;

  border: 1px solid #808080;
  border-radius: 6px;
  white-space: nowrap; // 모바일에서도 줄 바꿈 방지
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
