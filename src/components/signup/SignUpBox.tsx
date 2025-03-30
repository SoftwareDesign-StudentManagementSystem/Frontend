import styled from "styled-components";
import logoimg from "../../assets/logo.svg";
import { useState } from "react";

const SignUpBox = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <SignUpBoxWrapper>
      <Logo src={logoimg} />
      <ContentWrapper>
        <div className="maintitle">
          안녕하세요!
          <br />앱 이름이 뭔가요?
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
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <DuplicationChkBtn>중복 확인</DuplicationChkBtn>
          </div>
        </div>
        <div className="inputWrapper">
          <div className="inputtitle">비밀번호</div>
          <InputBox
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputWrapper">
          <div className="inputtitle">비밀번호 확인</div>
          <InputBox
            placeholder="비밀번호를 다시 입력해주세요."
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <SubmitButton>회원가입하기</SubmitButton>
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
  padding: 40px;
  gap: 20px;
  width: 60%;
  height: fit-content;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Logo = styled.img`
  width: 46px;
  height: 44px;
`;
const ContentWrapper = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  .maintitle {
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 150%;
    /* or 45px */
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
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */

    color: #808080;
  }
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

const DuplicationChkBtn = styled.button`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;

  width: 98px;
  height: 48px;

  border: 1px solid #808080;
  border-radius: 6px;
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
