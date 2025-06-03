import { Grade } from "../types/grades";
export declare const getMyGrades: () => Promise<Grade[]>;
export declare const getAllGradesByStudent: (studentId: number) => Promise<Grade[]>;
export declare const getGradesByClassFilter: (params: {
    year: number;
    semester: number;
    grade: number;
    classNum: number;
    studentNum: number;
}) => Promise<Grade[]>;
export declare const createStudentGrade: (studentId: number, data: {
    year: number;
    semester: "FIRST_SEMESTER" | "SECOND_SEMESTER";
    score: number;
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const updateStudentGrade: (gradeId: number, gradeData: Partial<Grade>) => Promise<Grade>;
export declare const deleteStudentGrade: (gradeId: number) => Promise<void>;
export declare const getStudentGrade: (year: number, semester: number, studentId: number) => Promise<Grade>;
export declare const getStudentMyGrade: (year: number, semester: number) => Promise<Grade>;
