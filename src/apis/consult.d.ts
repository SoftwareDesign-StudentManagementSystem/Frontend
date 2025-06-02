import { Consult } from "../types/consults.ts";
export declare const getConsult: (studentId: number) => Promise<Consult[]>;
export declare const postConsult: (studentId: number, consultData: {
    year: number;
    semester: string;
    content: string;
    nextCounselDate: Date;
    date: string;
}) => Promise<any>;
export declare const putConsult: (consultId: number, consultData: {
    year: number;
    semester: string;
    content: string;
    nextCounselDate: string;
    date: string;
}) => Promise<any>;
export declare const deleteConsult: (consultId: number) => Promise<void>;
export declare const getConsultByFilter: (studentId: number, year: number, semester: "FIRST_SEMESTER" | "SECOND_SEMESTER") => Promise<Consult[]>;
export declare const getFilteredConsultsForStudents: (filters: {
    grade?: number;
    classNum?: number;
    studentNum?: number;
    semester?: "FIRST_SEMESTER" | "SECOND_SEMESTER";
}) => Promise<Consult[]>;
