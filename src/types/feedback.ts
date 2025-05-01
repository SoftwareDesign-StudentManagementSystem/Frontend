export interface Feedback {
  teacher: string; // 담당 교사 이름 (예: "김철수")
  category: string;
  content: string; // 기록 내용 (예: "학생의 학업 성취도를 점검하고 학습 계획을 조정하였습니다.")
  recordedDate: string;
  visibleToStudent: boolean;
  visibleToParent: boolean;
}

export interface AddFeedbackProps {
  studentId: number;
  teacherId: number;
  category: string;
  content: string;
  visibleToStudent: boolean;
  visibleToParent: boolean;
  recordedDate: string;
}
