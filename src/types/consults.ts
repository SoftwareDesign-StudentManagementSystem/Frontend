export interface Consult {
  id: number;
  date: string; // 기록한 날짜 (예: "2025-04-01")
  nextCounselDate: string;
  teacherName: string;
  content: string; // 기록 내용 (예: "학생의 학업 성취도를 점검하고 학습 계획을 조정하였습니다.")
}
