import styled from "styled-components";
import InputBoxWrapper from "../../../resources/styles/InputBoxWrapper.tsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DropDownMenu from "../../common/DropDownMenu.tsx";
import useUserStore from "../../../stores/useUserStore.ts";
import ButtonOrange from "../../common/ButtonOrange.tsx";
import { postConsult } from "../../../apis/consult.ts";
import { useSearchParams } from "react-router-dom";
import ButtonWhite from "../../common/ButtonWhite.tsx";

interface InputBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const InputBox = ({ value, onChange }: InputBoxProps) => {
  return (
    <InputBoxWrapper
      placeholder="내용을 입력해주세요."
      value={value}
      onChange={onChange}
    />
  );
};

interface ConsultAddProps {
  setIsAddMode: (value: boolean) => void;
}
const ConsultAdd = ({ setIsAddMode }: ConsultAddProps) => {
  const [consultDate, setConsultDate] = useState<Date | null>(null);
  const [nextConsultDate, setNextConsultDate] = useState<Date | null>(null);
  const [inputContent, setInputContent] = useState("");

  //선택된 학생의 정보
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { userInfo } = useUserStore(); //현재 로그인한 사용자 정보
  const options = [userInfo.name]; // 교사명 드롭다운 옵션

  const handleSubmit = async () => {
    const consultData = {
      studentId: id,
      teacherId: userInfo.id,
      date: consultDate,
      content: inputContent,
      visibleToStudent: true,
      visibleToParent: true,
    };
    postConsult(consultData).then((res) => {
      alert(res.message);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value);
  };

  return (
    <ConsultAddWrapper>
      <OptionsWrapper>
        <DateWrapper>
          <div>
            <div className="title">상담 날짜</div>
            <StyledDatePicker
              selected={consultDate}
              onChange={(date: Date | Date[] | null) => {
                if (date instanceof Date || date === null) {
                  setConsultDate(date);
                }
              }}
              dateFormat="yyyy년 MM월 dd일"
              placeholderText="날짜를 선택하세요"
            />
          </div>
          <div>
            <div className="title">다음 상담 날짜</div>
            <StyledDatePicker
              selected={nextConsultDate}
              onChange={(date: Date | null) => setNextConsultDate(date)}
              dateFormat="yyyy년 MM월 dd일"
              placeholderText="날짜를 선택하세요"
            />
          </div>
        </DateWrapper>
        <div>
          <div className="title">상담 교사명</div>
          <DropDownMenu options={options} />
        </div>
      </OptionsWrapper>

      <InputBox value={inputContent} onChange={handleInputChange} />

      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <ButtonWhite
          text={"돌아가기"}
          onClick={() => {
            setIsAddMode(false);
          }}
        />
        <ButtonOrange text={"저장"} onClick={handleSubmit} />
      </div>
    </ConsultAddWrapper>
  );
};

export default ConsultAdd;

const ConsultAddWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;

  .title {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 150%;
    text-transform: capitalize;
    color: #000000;
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

// DatePicker에 스타일을 입히고 싶을 경우 이렇게 styled-components로 감쌀 수 있습니다.
const StyledDatePicker = styled(DatePicker)`
  width: fit-content;
  height: fit-content;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
