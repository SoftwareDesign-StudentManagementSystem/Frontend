import Modal from "./Modal";
import styled from "styled-components";
import { useState } from "react";
import ButtonOrange from "../common/ButtonOrange.tsx";

const ReportCreateModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      onClose={onClose}
      content={<ReportCreateModalContent />}
      title={"보고서 생성"}
    />
  );
};
export default ReportCreateModal;

const ReportCreateModalContent = () => {
  const categories = ["전체", "성적", "피드백", "상담내역", "출결", "특기사항"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (category === "전체") {
      // 전체 클릭 시 모든 항목 선택 또는 해제
      if (selectedCategories.length === categories.length - 1) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(categories.filter((c) => c !== "전체"));
      }
    } else {
      // 개별 항목 클릭
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const isAllSelected = selectedCategories.length === categories.length - 1;

  return (
    <ReportCreateModalContentWrapper>
      <div className="info">보고서를 생성하실 범주를 선택해주세요.</div>
      <CheckboxGroup>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={
                category === "전체"
                  ? isAllSelected
                  : selectedCategories.includes(category)
              }
              onChange={() => toggleCategory(category)}
            />
            {category}
          </label>
        ))}
      </CheckboxGroup>
      <ButtonWrapper>
        <ButtonOrange text={"다운로드"} />
      </ButtonWrapper>
    </ReportCreateModalContentWrapper>
  );
};

const ReportCreateModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  height: 100%;
  //padding: 1rem;

  .info {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;

    color: #000000;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  box-sizing: border-box;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  button {
    width: 200px;
  }
`;
