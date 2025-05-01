// 과목별 성적 타입
export interface SubjectGrade {
  score: number;
  average: number;
  achievementLevel: string;
  relativeRankGrade: number;
}

export interface SubjectScore {
  score: number;
  average: number;
  achievementLevel: string;
  relativeRankGrade: number;
}

// 학생 한 명의 전체 성적 정보 (Grade)
export interface Grade {
  id: number;
  studentId: number;
  profileImageUrl: string | null;
  year: number;
  semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
  [subject: string]: SubjectScore | number | string | null;
}

export interface GradeListProps {
  studentId: number;
  year: number;
  semester: number;
  miniView?: boolean;
}
