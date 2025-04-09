import styled from "styled-components";
import { useState } from "react";
import InputBoxWrapper from "../../../resources/styles/InputBoxWrapper.tsx";

const InputBox = () => {
  return <InputBoxWrapper placeholder="내용을 입력해주세요." />;
};

const FeedBackAdd = () => {
  const categories = ["성적", "태도", "출결", "행동"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const notifyTargets = ["전체", "학생", "학부모", "전송안함"];
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (category === "전체") {
      if (selectedCategories.length === categories.length - 1) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(categories.filter((c) => c !== "전체"));
      }
    } else {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  const toggleTarget = (target: string) => {
    if (target === "전체") {
      if (selectedTargets.length === notifyTargets.length - 1) {
        setSelectedTargets([]);
      } else {
        setSelectedTargets(notifyTargets.filter((t) => t !== "전체"));
      }
    } else {
      if (selectedTargets.includes(target)) {
        setSelectedTargets(selectedTargets.filter((t) => t !== target));
      } else {
        setSelectedTargets([...selectedTargets, target]);
      }
    }
  };

  const isAllCategorySelected =
    selectedCategories.length === categories.length - 1;
  const isAllTargetSelected =
    selectedTargets.length === notifyTargets.length - 1;

  return (
    <FeedBackAddWrapper>
      <div className="title">피드백을 생성하실 범주를 선택해주세요.</div>
      <CheckboxGroup>
        {["전체", ...categories].map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={
                category === "전체"
                  ? isAllCategorySelected
                  : selectedCategories.includes(category)
              }
              onChange={() => toggleCategory(category)}
            />
            {category}
          </label>
        ))}
      </CheckboxGroup>

      <div className="title">알림을 보낼 대상을 선택해주세요.</div>
      <CheckboxGroup>
        {notifyTargets.map((target) => (
          <label key={target}>
            <input
              type="checkbox"
              checked={
                target === "전체"
                  ? isAllTargetSelected
                  : selectedTargets.includes(target)
              }
              onChange={() => toggleTarget(target)}
            />
            {target}
          </label>
        ))}
      </CheckboxGroup>
      <InputBox />
    </FeedBackAddWrapper>
  );
};

export default FeedBackAdd;

const FeedBackAddWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
    text-transform: capitalize;
    color: #000000;
    //margin-bottom: 8px;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  flex-wrap: wrap;

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
