export interface Feedback {
    teacherName: string;
    category: string;
    content: string;
    date: string;
    visibleToStudent: boolean;
    visibleToParent: boolean;
}
export type SemesterType = "FIRST_SEMESTER" | "SECOND_SEMESTER";
export type FeedbackCategory = "성적" | "생활" | "태도" | "기타";
export interface AddFeedbackProps {
    year: number;
    semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
    category: string;
    content: string;
    visibleToStudent: boolean;
    visibleToParent: boolean;
}
