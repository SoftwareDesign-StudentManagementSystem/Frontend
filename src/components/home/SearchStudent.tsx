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
      <InputWrapper>
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
      </InputWrapper>
      <ButtonWrapper>
        <ButtonWhite text={"검색"} />
      </ButtonWrapper>
    </HorizontalLineWrapper>
  );
};

export default SearchStudent;

const HorizontalLineWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 배치하여 버튼을 아래로 */
  align-items: center; /* 버튼을 중앙으로 정렬 */
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex-direction: row; /* PC에서는 가로로 배치 */
    justify-content: space-between;
    align-items: center;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 15px;

  .inputWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 130px;
    flex: 1;
  }

  .inputtitle {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #808080;
  }
`;

const InputBox = styled.input`
  flex: 1;
  height: 48px;
  width: 150px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 12px 20px;
`;

const ButtonWrapper = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center; /* 모바일에서 중앙 정렬 */
  align-items: center;
  margin-top: 20px;

  @media (min-width: 768px) {
    justify-content: flex-end; /* PC에서는 오른쪽 정렬 */
    margin-top: 0; /* PC에서는 마진 없앰 */
  }
`;
