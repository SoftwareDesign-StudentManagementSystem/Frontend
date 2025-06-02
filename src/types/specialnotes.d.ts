export interface Specialty {
    teacherName: string;
    id: number;
    studentId: number;
    content: string;
    year: number;
    semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
    date: string;
}
export interface AddSpecialtyProps {
    content: string;
    year: number;
    semester: string;
    date: string;
}
export interface UpdateSpecialtyProps {
    content?: string;
    year?: number;
    semester?: string;
    date?: string;
}
