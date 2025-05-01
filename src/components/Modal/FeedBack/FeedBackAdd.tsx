import styled from "styled-components";
import { useState } from "react";
import InputBoxWrapper from "../../../resources/styles/InputBoxWrapper.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import ButtonOrange from "../../common/ButtonOrange.tsx";
import { postConsult } from "../../../apis/consult.ts";
import { postFeedback } from "../../../apis/feedback.ts";
import { useSearchParams } from "react-router-dom";
import useUserStore from "../../../stores/useUserStore.ts";

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

interface FeedbackAddProps {
  setIsAddMode: (value: boolean) => void;
}
const FeedBackAdd = ({ setIsAddMode }: FeedbackAddProps) => {
  //선택된 학생의 정보
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));
  const { userInfo } = useUserStore(); //현재 로그인한 사용자 정보

  const [inputContent, setInputContent] = useState("");

  const categories = ["성적", "태도", "출결", "행동"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "성적",
  ]);

  const notifyTargets = ["학생", "학부모"];
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories([category]);
  };

  const toggleTarget = (target: string) => {
    if (selectedTargets.includes(target)) {
      setSelectedTargets(selectedTargets.filter((t) => t !== target));
    } else {
      setSelectedTargets([...selectedTargets, target]);
    }
  };

  const isAllCategorySelected =
    selectedCategories.length === categories.length - 1;
  const isAllTargetSelected =
    selectedTargets.length === notifyTargets.length - 1;

  const handleSubmit = async () => {
    const visibleToStudent = selectedTargets.includes("학생");
    const visibleToParent = selectedTargets.includes("학부모");

    const feedbackData = {
      studentId: id,
      teacherId: userInfo.id,
      category: selectedCategories[0],
      content: inputContent,
      visibleToStudent,
      visibleToParent,
      recordedDate: new Date().toISOString().split("T")[0],
    };
    console.log(feedbackData);

    postFeedback(feedbackData).then((res) => {
      alert(res.message);
      setIsAddMode(false);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value);
  };

  return (
    <FeedBackAddWrapper>
      <div className="title">피드백을 생성하실 범주를 선택해주세요.(필수)</div>
      <CheckboxGroup>
        {[...categories].map((category) => (
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

      <div className="title">알림을 보낼 대상을 선택해주세요.(선택)</div>
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
