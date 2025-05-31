export interface Feedback {
  id: number;
  teacherName: string; // 담당 교사 이름 (예: "김철수")
  category: string;
  content: string; // 기록 내용 (예: "학생의 학업 성취도를 점검하고 학습 계획을 조정하였습니다.")
  date: string;
  visibleToStudent: boolean;
  visibleToParent: boolean;
}

export type SemesterType = "FIRST_SEMESTER" | "SECOND_SEMESTER";

export type FeedbackCategory = "성적" | "생활" | "태도" | "기타"; // 필요시 확장

// types/feedback.ts
export interface AddFeedbackProps {
  year: number;
  semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
  category: string;
  content: string;
  visibleToStudent: boolean;
  visibleToParent: boolean;
}
