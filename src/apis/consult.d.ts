import { Consult } from "../types/consults.ts";
export declare const getConsult: (studentId: number) => Promise<Consult[]>;
export declare const postConsult: (consultData: {
    studentId: string | null;
    teacherId: number;
    date: Date | null;
    content: string;
    visibleToStudent: boolean;
    visibleToParent: boolean;
}) => Promise<any>;
