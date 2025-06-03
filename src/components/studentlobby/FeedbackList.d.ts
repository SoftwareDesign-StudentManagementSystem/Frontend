import { Feedback } from "../../types/feedback";
declare const FeedbackList: ({ studentId, miniView, onSelectFeedback, }: {
    studentId: number;
    miniView?: boolean;
    onSelectFeedback?: (feedback: Feedback) => void;
}) => import("react/jsx-runtime").JSX.Element;
export default FeedbackList;
