import { Feedback, AddFeedbackProps } from "../types/feedback.ts";
export declare const getFeedback: (studentId: number) => Promise<Feedback[]>;
export declare const postFeedback: (consultData: AddFeedbackProps) => Promise<any>;
