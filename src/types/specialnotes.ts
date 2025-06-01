export interface Specialty {
  teacherName: string;
  id: number;
  studentId: number;
  content: string;
  year: number; // 예: 3
  semester: "FIRST_SEMESTER" | "SECOND_SEMESTER"; // 문자열로 변경
  date: string; // 예: "2025-05-28"
}

export interface AddSpecialtyProps {
  content: string;
  year: number;
  semester: string;
}

export interface UpdateSpecialtyProps {
  content?: string;
  year?: number;
  semester?: number;
}
