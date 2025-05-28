export interface Specialty {
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
}
export interface UpdateSpecialtyProps {
    content?: string;
    year?: number;
    semester?: number;
}
