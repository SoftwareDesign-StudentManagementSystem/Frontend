import styled from "styled-components";
import { useState } from "react";
import ButtonWhite from "../common/ButtonWhite.tsx";

const SearchStudent = () => {
  const [grade, setGrade] = useState("");
  const [classnum, setClassnum] = useState("");
  const [studentid, setStudentid] = useState("");
  const [name, setName] = useState("");

  return (
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
      <div className="inputWrapper">
        <div className="inputtitle">이름</div>
        <InputBox
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <ButtonWhite text={"검색"} />
    </HorizontalLineWrapper>
  );
};

export default SearchStudent;

const InputBox = styled.input`
  flex: 1;
  height: 48px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 12px 20px;
`;
const HorizontalLineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  input {
    width: 150px;
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
`;
