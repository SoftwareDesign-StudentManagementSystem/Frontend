// 과목별 성적 타입
export interface SubjectGrade {
  score: number;
  average: number;
  achievementLevel: string;
  relativeRankGrade: number;
}

// 학생 한 명의 전체 성적 정보 (Grade)
export interface Grade {
  id: number;
  studentId: number;
  profileImageUrl: string;
  year: number;
  semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
  koreanLanguage: SubjectGrade;
  mathematics: SubjectGrade;
  english: SubjectGrade;
  socialStudies: SubjectGrade;
  history: SubjectGrade;
  ethics: SubjectGrade;
  economics: SubjectGrade;
  physics: SubjectGrade;
  chemistry: SubjectGrade;
  biology: SubjectGrade;
  earthScience: SubjectGrade;
  music: SubjectGrade;
  art: SubjectGrade;
  physicalEducation: SubjectGrade;
  technologyAndHomeEconomics: SubjectGrade;
  computerScience: SubjectGrade;
  secondForeignLanguage: SubjectGrade;
}

export interface GradeListProps {
  studentId: number;
  year: number;
  semester: number;
  miniView?: boolean;
}
