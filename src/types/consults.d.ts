export interface Consult {
    date: string;
    nextDate: string;
    teacher: string;
    content: string;
}
export interface AddConsultProps {
    studentId: number;
    teacherId: number;
    date: string;
    content: string;
    visibleToStudent: boolean;
    visibleToParent: boolean;
}
