import { Grade } from "../types/grades.ts";
export declare const getStudentGrade: (year: number, semester: number, studentId: number) => Promise<Grade[]>;
export declare const getStudentMyGrade: (year: number, semester: number) => Promise<Grade[]>;
