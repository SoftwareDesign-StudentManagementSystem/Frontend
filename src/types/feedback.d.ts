export interface Feedback {
    teacher: string;
    category: string;
    content: string;
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
