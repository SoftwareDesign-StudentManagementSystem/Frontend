import { UserDetailInfo } from "../../../types/members";
import { Feedback } from "../../../types/feedback";
interface FeedbackAddProps {
    setIsAddMode: (value: boolean) => void;
    studentInfo: UserDetailInfo;
    initialFeedback?: Feedback | null;
}
declare const FeedBackAdd: ({ setIsAddMode, studentInfo, initialFeedback, }: FeedbackAddProps) => import("react/jsx-runtime").JSX.Element;
export default FeedBackAdd;
