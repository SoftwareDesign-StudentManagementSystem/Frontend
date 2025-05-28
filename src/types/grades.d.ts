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
