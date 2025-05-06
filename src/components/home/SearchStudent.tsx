import styled from "styled-components";
import { useState } from "react";
import ButtonWhite from "../common/ButtonWhite.tsx";
import { UserInfo } from "../../types/members";
import useUserStore from "../../stores/useUserStore.ts"; // 경로 주의

interface SearchStudentProps {
  students: UserInfo[];
  onSearch: (params: {
    grade: string;
    classnum: string;
    studentid: string;
    name: string;
  }) => void;
}

const SearchStudent = ({ onSearch }: SearchStudentProps) => {
  const { userInfo } = useUserStore();
  const [grade, setGrade] = useState(userInfo.year?.toString() || "");
  const [classnum, setClassnum] = useState(userInfo.classId?.toString() || "");
  const [studentid, setStudentid] = useState("");
  const [name, setName] = useState("");

  const handleSearchClick = () => {
    onSearch({ grade, classnum, studentid, name });
  };

  const gradeOptions = Array.from({ length: 3 }, (_, i) => (i + 1).toString());
  const classnumOptions = Array.from({ length: 10 }, (_, i) =>
    (i + 1).toString(),
  );
  const studentidOptions = Array.from({ length: 15 }, (_, i) =>
    (i + 1).toString(),
  );

  return (
    <HorizontalLineWrapper>
      <InputWrapper>
        <div className="inputWrapper">
          <div className="inputtitle">학년</div>
          <SelectBox value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">전체</option>
            {gradeOptions.map((g) => (
              <option key={g} value={g}>
                {g}학년
              </option>
            ))}
          </SelectBox>
        </div>
        <div className="inputWrapper">
          <div className="inputtitle">반</div>
          <SelectBox
            value={classnum}
            onChange={(e) => setClassnum(e.target.value)}
          >
            <option value="">전체</option>
            {classnumOptions.map((c) => (
              <option key={c} value={c}>
                {c}반
              </option>
            ))}
          </SelectBox>
        </div>
        <div className="inputWrapper">
          <div className="inputtitle">번호</div>
          <SelectBox
            value={studentid}
            onChange={(e) => setStudentid(e.target.value)}
          >
            <option value="">전체</option>
            {studentidOptions.map((id) => (
              <option key={id} value={id}>
                {id}번
              </option>
            ))}
          </SelectBox>
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
        <ButtonWhite text={"검색"} onClick={handleSearchClick} />
      </ButtonWrapper>
    </HorizontalLineWrapper>
  );
};

export default SearchStudent;

// Styled-components 수정 추가
const HorizontalLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    flex-direction: row;
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
    font-weight: 400;
    font-size: 14px;
    color: #808080;
  }
`;

const SelectBox = styled.select`
  flex: 1;
  height: 48px;
  width: 150px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 12px 20px;
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
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  @media (min-width: 768px) {
    justify-content: flex-end;
    margin-top: 0;
  }
`;
