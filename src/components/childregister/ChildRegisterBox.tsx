import styled from "styled-components";
import logoimg from "../../assets/logo.svg";
import { useState } from "react";
import { postFollow } from "../../apis/members.ts";
import { useNavigate } from "react-router-dom";

const ChildRegisterBox = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [classnum, setClassnum] = useState("");
  const [studentid, setStudentid] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const [birthmonth, setBirthmonth] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async () => {
    const birthdayString = `${birthyear}-${birthmonth.padStart(2, "0")}-${birthday.padStart(2, "0")}`;

    const reqBody = {
      name: name,
      year: Number(grade),
      classId: Number(classnum),
      number: Number(studentid),
      birthday: birthdayString,
    };

    try {
      const response = await postFollow(reqBody);
      console.log(response);
      alert(
        "자녀 등록 요청을 성공하였습니다. 자녀의 승인 후 학생 리스트에 표시됩니다.",
      );
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <ChildRegisterWrapper>
      <Logo src={logoimg} />
      <ContentWrapper>
        <div className="maintitle">
          자녀 등록 <br />
          <span style={{ fontSize: "20px" }}>
            자녀 정보를 통해 인증하여 자녀를 등록할 수 있어요.
          </span>
        </div>
        <div className="inputWrapper">
          <div className="inputtitle">자녀 이름</div>
          <InputBox
            placeholder="자녀의 이름을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <HorizontalLineWrapper>
          <div className="inputWrapper">
            <div className="inputtitle">학년</div>
            <InputBox
              placeholder="학년"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">반</div>
            <InputBox
              placeholder="반"
              value={classnum}
              onChange={(e) => setClassnum(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">번호</div>
            <InputBox
              placeholder="번호"
              value={studentid}
              onChange={(e) => setStudentid(e.target.value)}
            />
          </div>
        </HorizontalLineWrapper>
        <HorizontalLineWrapper>
          <div className="inputWrapper">
            <div className="inputtitle">생년월일</div>
            <InputBox
              placeholder="년(YYYY)"
              value={birthyear}
              onChange={(e) => setBirthyear(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">_</div>
            <InputBox
              placeholder="월(MM)"
              value={birthmonth}
              onChange={(e) => setBirthmonth(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <div className="inputtitle">_</div>
            <InputBox
              placeholder="일(DD)"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
        </HorizontalLineWrapper>
        <label className="checklabel">
          <input type="checkbox" />
          자녀 개인정보 수집 동의{" "}
          <span style={{ color: "#ffb608" }}>(필수)</span>
        </label>
        <SubmitButton onClick={handleSubmit}>회원가입하기</SubmitButton>
      </ContentWrapper>
    </ChildRegisterWrapper>
  );
};

export default ChildRegisterBox;

const ChildRegisterWrapper = styled.div`
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
  width: fit-content;
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
    line-height: 150%; /* or 45px */
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
    line-height: 150%; /* identical to box height, or 21px */
    color: #808080;
  }
  .checklabel {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    color: #666666;

    display: flex;
    flex-direction: row;
    width: 100%;
  }
`;
const InputBox = styled.input`
  flex: 1;
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

const HorizontalLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  input {
    width: 150px;
  }
`;
