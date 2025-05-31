import { Feedback } from "../types/feedback";
export declare const getFeedback: (studentId: number) => Promise<Feedback[]>;
export declare const getMyFeedback: () => Promise<Feedback[]>;
export declare const getMyFilteredFeedback: (year: number, semester: string) => Promise<Feedback[]>;
export declare const getStudentFilteredFeedback: (studentId: number, year: number, semester: string) => Promise<Feedback[]>;
export declare const postFeedback: (studentId: number, feedback: {
    year: number;
    semester: string;
    category: string;
    content: string;
    visibleToStudent: boolean;
    visibleToParent: boolean;
}) => Promise<any>;
export declare const putFeedback: (feedbackId: number, updatedData: {
    year: number;
    semester: string;
    category: string;
    content: string;
    visibleToStudent: boolean;
    visibleToParent: boolean;
}) => Promise<void>;
export declare const deleteFeedback: (feedbackId: number) => Promise<void>;
