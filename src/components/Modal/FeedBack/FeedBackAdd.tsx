import styled from "styled-components";
import { useState } from "react";
import InputBoxWrapper from "../../../resources/styles/InputBoxWrapper.tsx";
import ButtonWhite from "../../common/ButtonWhite.tsx";
import ButtonOrange from "../../common/ButtonOrange.tsx";
import {
  deleteFeedback,
  postFeedback,
  putFeedback,
} from "../../../apis/feedback.ts"; // 수정 API 추가
import { useSearchParams } from "react-router-dom";
import { UserDetailInfo } from "../../../types/members";
import { Feedback } from "../../../types/feedback.ts";
import ButtonRed from "../../common/ButtonRed"; // Feedback 타입 임포트

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
  studentInfo: UserDetailInfo;
  initialFeedback?: Feedback | null;
}

const FeedBackAdd = ({
  setIsAddMode,
  studentInfo,
  initialFeedback,
}: FeedbackAddProps) => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id"));

  const categories = ["성적", "태도", "출결", "행동"];
  const notifyTargets = ["학생", "학부모"];

  const [inputContent, setInputContent] = useState(
    initialFeedback?.content || "",
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFeedback ? [initialFeedback.category] : ["성적"],
  );
  const [selectedTargets, setSelectedTargets] = useState<string[]>(() => {
    const targets: string[] = [];
    if (initialFeedback?.visibleToStudent) targets.push("학생");
    if (initialFeedback?.visibleToParent) targets.push("학부모");
    return targets;
  });

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

  const handleSubmit = async () => {
    const visibleToStudent = selectedTargets.includes("학생");
    const visibleToParent = selectedTargets.includes("학부모");

    const now = new Date();
    const year = studentInfo.year;
    if (!year) return;
    const semester =
      now.getMonth() + 1 <= 6 ? "FIRST_SEMESTER" : "SECOND_SEMESTER";

    const feedbackData = {
      year,
      semester,
      date: now.toISOString().substring(0, 10), // "YYYY-MM-DD" 형식
      category: selectedCategories[0],
      content: inputContent,
      visibleToStudent,
      visibleToParent,
    };
    const feedbackDataEdited = {
      year,
      semester,
      date: initialFeedback?.date ?? now.toISOString().substring(0, 10),
      category: selectedCategories[0],
      content: inputContent,
      visibleToStudent,
      visibleToParent,
    };

    try {
      if (initialFeedback) {
        await putFeedback(initialFeedback.id, feedbackDataEdited);
      } else {
        await postFeedback(id, feedbackData);
      }
      alert("피드백이 저장되었습니다.");
      setIsAddMode(false);
    } catch (error) {
      alert("피드백 저장에 실패했습니다." + error);
    }
  };

  const handleDelete = async () => {
    if (!initialFeedback) return;
    const confirmDelete = window.confirm(
      "정말로 이 피드백을 삭제하시겠습니까?",
    );
    if (!confirmDelete) return;

    try {
      await deleteFeedback(initialFeedback.id);
      alert("피드백이 삭제되었습니다.");
      setIsAddMode(false);
    } catch (error) {
      alert("피드백 삭제에 실패했습니다." + error);
    }
  };

  return (
    <FeedBackAddWrapper>
      <div className="title">피드백을 생성하실 범주를 선택해주세요.(필수)</div>
      <CheckboxGroup>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            {category}
          </label>
        ))}
      </CheckboxGroup>

      {!initialFeedback && (
        <>
          <div className="title">알림을 보낼 대상을 선택해주세요.(선택)</div>
          <CheckboxGroup>
            {notifyTargets.map((target) => (
              <label key={target}>
                <input
                  type="checkbox"
                  checked={selectedTargets.includes(target)}
                  onChange={() => toggleTarget(target)}
                />
                {target}
              </label>
            ))}
          </CheckboxGroup>
        </>
      )}

      <InputBox
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
      />

      <ButtonGroup>
        <ButtonWhite text={"돌아가기"} onClick={() => setIsAddMode(false)} />
        {initialFeedback && <ButtonRed text="삭제" onClick={handleDelete} />}
        <ButtonOrange
          text={initialFeedback ? "수정" : "저장"}
          onClick={handleSubmit}
        />
      </ButtonGroup>
    </FeedBackAddWrapper>
  );
};

export default FeedBackAdd;

const FeedBackAddWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  box-sizing: border-box;

  .title {
    font-weight: 400;
    font-size: 18px;
    line-height: 150%;
    color: #000;
    //margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    padding: 0 4px;

    .title {
      font-size: 16px;
    }
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;

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

  @media (max-width: 768px) {
    gap: 12px;

    label {
      font-size: 0.9rem;
    }

    input[type="checkbox"] {
      width: 14px;
      height: 14px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-top: 20px;
`;
