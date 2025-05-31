import { UserDetailInfo } from "../../../types/members";
interface FeedbackAddProps {
    setIsAddMode: (value: boolean) => void;
    studentInfo: UserDetailInfo;
}
declare const FeedBackAdd: ({ setIsAddMode, studentInfo }: FeedbackAddProps) => import("react/jsx-runtime").JSX.Element;
export default FeedBackAdd;
