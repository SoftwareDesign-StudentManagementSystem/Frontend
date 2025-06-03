import styled from "styled-components";
import InputBoxWrapper from "../../../resources/styles/InputBoxWrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import DropDownMenu from "../../common/DropDownMenu";
import useUserStore from "../../../stores/useUserStore";
import ButtonOrange from "../../common/ButtonOrange";
import { deleteConsult, postConsult, putConsult } from "../../../apis/consult";
import ButtonWhite from "../../common/ButtonWhite";
import { DatePickerOverride } from "../../../resources/styles/CommonStyles";
import { Consult } from "../../../types/consults";
import ButtonRed from "../../common/ButtonRed";
import { UserDetailInfo } from "../../../types/members";
import getCurrentSemesterString from "../../../utils/getCurrentSemesterString";

interface InputBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
}

const InputBox = ({ value, onChange, readOnly }: InputBoxProps) => {
  return (
    <InputBoxWrapper
      placeholder="내용을 입력해주세요."
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};

interface ConsultAddProps {
  setIsAddMode: (value: boolean) => void;
  editData?: Consult | null;
  studentInfo: UserDetailInfo;
}

const ConsultAdd = ({
  setIsAddMode,
  editData,
  studentInfo,
}: ConsultAddProps) => {
  const [consultDate, setConsultDate] = useState<Date | null>(
    editData?.date ? new Date(editData.date) : new Date(),
  );

  const [nextConsultDate, setNextConsultDate] = useState<Date | null>(
    editData?.nextCounselDate ? new Date(editData.nextCounselDate) : null,
  );
  const [inputContent, setInputContent] = useState(editData?.content || "");

  //선택된 학생의 정보
  const id = studentInfo.id;

  const { userInfo } = useUserStore(); //현재 로그인한 사용자 정보
  const options = [editData?.teacherName ?? userInfo.name]; // 교사명 드롭다운 옵션
  const canEdit = userInfo.role === "ROLE_TEACHER";

  const handleSubmit = async () => {
    if (!consultDate || !inputContent || !studentInfo.year) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    const consultData = {
      year: studentInfo.year,
      semester: getCurrentSemesterString(),
      content: inputContent,
      nextCounselDate: nextConsultDate,
      date: consultDate.toISOString().slice(0, 10),
    };

    const consultDataEdited = {
      year: studentInfo.year,
      semester: getCurrentSemesterString(),
      content: inputContent,
      nextCounselDate: nextConsultDate,
      date: editData?.date ?? consultDate.toISOString().slice(0, 10),
    };

    try {
      if (editData) {
        // 수정 모드
        // @ts-ignore
        await putConsult(editData.id, consultDataEdited);
        alert("상담이 수정되었습니다.");
      } else {
        // 등록 모드
        if (!nextConsultDate) {
          return;
        }

        // @ts-ignore
        await postConsult(id, consultData);
        alert("상담이 등록되었습니다.");
      }
      setIsAddMode(false);
    } catch (error) {
      alert("작업 중 오류가 발생했습니다: " + error);
    }
  };

  const handleDelete = async () => {
    if (!editData) return;
    const confirmDelete = window.confirm("정말로 이 상담을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteConsult(editData.id);
      alert("상담이 삭제되었습니다.");
      setIsAddMode(false);
    } catch (error) {
      alert("상담 삭제에 실패했습니다." + error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value);
  };

  return (
    <>
      <DatePickerOverride /> {/* 여기에 추가 */}
      <ConsultAddWrapper>
        <OptionsWrapper>
          <DateWrapper>
            <div>
              <div className="title">상담 날짜</div>
              <DatePickerWrapper>
                <DatePicker
                  selected={consultDate}
                  onChange={(date) => {
                    if (!Array.isArray(date)) {
                      setConsultDate(date);
                    }
                  }}
                  dateFormat="yyyy년 MM월 dd일"
                  placeholderText="날짜를 선택하세요"
                  disabled={true}
                />
              </DatePickerWrapper>
            </div>
            <div>
              <div className="title">다음 상담 날짜</div>
              <DatePickerWrapper>
                <DatePicker
                  selected={nextConsultDate}
                  onChange={(date) => {
                    if (!Array.isArray(date)) {
                      setNextConsultDate(date);
                    }
                  }}
                  dateFormat="yyyy년 MM월 dd일"
                  placeholderText="날짜를 선택하세요"
                  disabled={!canEdit}
                />
              </DatePickerWrapper>
            </div>
          </DateWrapper>
          <div>
            <div className="title">상담 교사명</div>
            <DropDownMenu options={options} />
          </div>
        </OptionsWrapper>

        <InputBox
          value={inputContent}
          onChange={handleInputChange}
          readOnly={!canEdit}
        />

        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <ButtonWhite text="돌아가기" onClick={() => setIsAddMode(false)} />
          {editData && canEdit && (
            <ButtonRed text="삭제" onClick={handleDelete} />
          )}
          {canEdit && (
            <ButtonOrange
              text={editData ? "수정" : "저장"}
              onClick={handleSubmit}
            />
          )}
        </div>
      </ConsultAddWrapper>
    </>
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

  @media (max-width: 768px) {
    gap: 12px;

    .title {
      font-size: 15px;
    }
  }
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    height: fit-content;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 6px 10px;
    }
  }
`;
