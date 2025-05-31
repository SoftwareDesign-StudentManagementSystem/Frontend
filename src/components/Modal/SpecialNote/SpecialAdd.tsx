import styled from "styled-components";
import InputBoxWrapper from "../../../resources/styles/InputBoxWrapper.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import ButtonOrange from "../../common/ButtonOrange.tsx";
import ButtonRed from "../../common/ButtonRed.tsx"; // 삭제 버튼 import
import { useState } from "react";
import { deleteSpecialty, postSpecialty } from "../../../apis/specialnote.ts";
import { AddSpecialtyProps, Specialty } from "../../../types/specialnotes";
import DatePicker from "react-datepicker";
import { DatePickerOverride } from "../../../resources/styles/CommonStyles";
import { UserDetailInfo } from "../../../types/members";

interface SpecialAddProps {
  setIsAddMode: (arg0: boolean) => void;
  studentInfo?: UserDetailInfo;
  editData?: Specialty;
}

const SpecialAdd = ({
  setIsAddMode,
  studentInfo,
  editData,
}: SpecialAddProps) => {
  const [content, setContent] = useState(editData?.content ?? "");
  const [recordDate, setRecordDate] = useState<Date>(
    editData ? new Date(editData.date) : new Date(),
  );

  const isEdit = !!editData;

  const handleSave = async () => {
    if (studentInfo === undefined) return;
    if (!recordDate) return alert("기록일을 선택해주세요.");
    if (!content) return alert("내용을 입력해주세요.");
    const year = Number(studentInfo.year);
    const semester =
      recordDate.getMonth() + 1 <= 6 ? "FIRST_SEMESTER" : "SECOND_SEMESTER";

    const newSpecialty: AddSpecialtyProps = {
      content,
      year,
      semester,
    };

    try {
      await postSpecialty(studentInfo.id, newSpecialty); // putSpecialty 필요 시 수정
      alert(isEdit ? "수정되었습니다." : "특기사항이 저장되었습니다.");
      setIsAddMode(false);
    } catch (error) {
      alert("저장에 실패했습니다.");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!editData) return;

    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteSpecialty(editData.id);
        alert("삭제되었습니다.");
        setIsAddMode(false);
      } catch (error) {
        alert("삭제에 실패했습니다.");
        console.error(error);
      }
    }
  };

  return (
    <>
      <DatePickerOverride />
      <FeedBackAddWrapper>
        <div>
          <div className="title">기록일</div>
          <DatePickerWrapper>
            <DatePicker
              selected={recordDate}
              onChange={(date) => {
                if (!Array.isArray(date) && date) setRecordDate(date);
              }}
              dateFormat="yyyy년 MM월 dd일"
              placeholderText="날짜를 선택하세요"
            />
          </DatePickerWrapper>
        </div>

        <InputBoxWrapper
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <ButtonGroup>
          <ButtonWhite text="돌아가기" onClick={() => setIsAddMode(false)} />
          {isEdit && <ButtonRed text="삭제" onClick={handleDelete} />}
          <ButtonOrange text={isEdit ? "수정" : "저장"} onClick={handleSave} />
        </ButtonGroup>
      </FeedBackAddWrapper>
    </>
  );
};

export default SpecialAdd;

const FeedBackAddWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    gap: 12px;
    .title {
      font-size: 16px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-top: 20px;

  @media (max-width: 768px) {
    gap: 8px;
    padding-top: 12px;
  }
`;

const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: fit-content;
  }

  .react-datepicker__input-container input {
    width: 100%;
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
